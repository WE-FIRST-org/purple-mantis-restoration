/*
 * mostly based on the ESP-IDF RC-Servo tutorial
 *
 * SPDX-FileCopyrightText: 2022-2023 Espressif Systems (Shanghai) CO LTD
 * SPDX-License-Identifier: Apache-2.0
 */

// not my best code, but im writing this at 2 am sleep deprived awake on red bull cuz we need this tmrw

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "driver/mcpwm_prelude.h"

static const char *LOGTAG = "PWM Driver Logging";

#define SERVO_PULSE_GPIO             0        // GPIO connects to the PWM signal line
#define SERVO_TIMEBASE_RESOLUTION_HZ 1000000  // 1MHz, 1us per tick
#define SERVO_TIMEBASE_PERIOD        20000    // 20000 ticks, 20ms
#define MAX_MOTORS                   16
// i "limit" the motors to 16, although the real limit is is the mcpwm timers, as there are 3 timers for each of the two groups
// each timer can have 3 operators, which has 2 comparators, which has 2 generators

#define INIT_VAL   1503     // the pulse width (in usecs) to initialize
                            // should it be a parameter? yes
                            // am I going to do that? no im tired and my head hurts

mcpwm_timer_handle_t newtimer(int groupid)
{
    ESP_LOGI(LOGTAG, "Create timer");

    mcpwm_timer_handle_t timer = NULL;             
    mcpwm_timer_config_t timer_config = {
        .group_id = groupid,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = SERVO_TIMEBASE_RESOLUTION_HZ,
        .period_ticks = SERVO_TIMEBASE_PERIOD,
        .count_mode = MCPWM_TIMER_COUNT_MODE_UP,
    };
    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_config, &timer));

    return timer;
}

void enabletimer(mcpwm_timer_handle_t timer)
{
    ESP_LOGI(LOGTAG, "Enable and start timer");
    ESP_ERROR_CHECK(mcpwm_timer_enable(timer));
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(timer, MCPWM_TIMER_START_NO_STOP));

}

mcpwm_cmpr_handle_t initMotor(int port, int groupid, mcpwm_timer_handle_t timer) 
{
    // check the mcpwm docs on esp i dont really understand this tbh
    // init timer stuf
   
    ESP_LOGI(LOGTAG, "Create operator");
    mcpwm_oper_handle_t oper = NULL;
    mcpwm_operator_config_t operator_config = {
        .group_id = groupid, // operator must be in the same group to the timer
    };
    ESP_ERROR_CHECK(mcpwm_new_operator(&operator_config, &oper));

    ESP_LOGI(LOGTAG, "Connect timer and operator");
    ESP_ERROR_CHECK(mcpwm_operator_connect_timer(oper, timer));
    mcpwm_cmpr_handle_t comparator = NULL;
    mcpwm_comparator_config_t comparator_config = {
        .flags.update_cmp_on_tez = true,
    };
    ESP_ERROR_CHECK(mcpwm_new_comparator(oper, &comparator_config, &comparator));

    mcpwm_gen_handle_t generator = NULL;
    mcpwm_generator_config_t generator_config = {
        .gen_gpio_num = port,
    };

    ESP_ERROR_CHECK(mcpwm_new_generator(oper, &generator_config, &generator));

    // set the initial compare value, so that the servo will spin to the center position
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(comparator, INIT_VAL));

    ESP_LOGI(LOGTAG, "Set generator action on timer and compare event");
    // go high on counter empty
    ESP_ERROR_CHECK(mcpwm_generator_set_action_on_timer_event(generator,
                                                              MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_HIGH)));
    // go low on compare threshold
    ESP_ERROR_CHECK(mcpwm_generator_set_action_on_compare_event(generator,
                                                                MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, comparator, MCPWM_GEN_ACTION_LOW)));

    return comparator;
}

mcpwm_cmpr_handle_t comparators[MAX_MOTORS]; // we support up to 16 motors, can change if we need more
int ports[MAX_MOTORS]; // same for ports
int maxcmpr = 0;


void initMotorControl(int motors[], int motorssize)
{
    int group = 0;
    mcpwm_timer_handle_t timer = NULL;
    int i=0;

    // there are 2 timer groups
    // each group has 3 timers / operators
    // and each timer/oper combo has 2 comparators
    // each comparator does have more generator, but we dont need that in our use case

    for(i=0; i < motorssize; i++)
    {
        if(i % 2 == 0) timer = newtimer(group);
        mcpwm_cmpr_handle_t compar = initMotor(motors[i], group, timer);
        
        ports[maxcmpr] = motors[i];
        comparators[maxcmpr++] = compar;

        if(i % 2 == 1) enabletimer(timer);
        if(i % 6 == 5) group += 1; // maximum of 12 motors (0 -> 11)
    }

    if(i % 2 > 0) enabletimer(timer); // if the # of timers is not 2 mod 0

}

/*
 * make sure you run initMotor and initMotorControl first you junkhead
 *
 * i shouldve made them objects in C++, so the min and max pulse width could be set 
 * but uh
 * nah
*/
void setPWMSignal(int port, double value, int min_us, int max_us) // ima copy what WPILib does and do [-1, 1] for value bounds
{
    int i=0;
    for(;i< sizeof(ports) / 4; i++) {
        if(ports[i] == port) break;
    }
    if(i >= MAX_MOTORS) return;
    uint32_t comparedpulse = ((value + 1) / 2) * (max_us - min_us) + min_us;
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(comparators[i], comparedpulse));

}
/*
void run_servo(void)
{
    ESP_LOGI(LOGTAG, "Create timer and operator");
    timer = NULL;
    timer_config = {
        .group_id = 0,
        .clk_src = MCPWM_TIMER_CLK_SRC_DEFAULT,
        .resolution_hz = SERVO_TIMEBASE_RESOLUTION_HZ,
        .period_ticks = SERVO_TIMEBASE_PERIOD,
        .count_mode = MCPWM_TIMER_COUNT_MODE_UP,
    };
    ESP_ERROR_CHECK(mcpwm_new_timer(&timer_config, &timer));

    oper = NULL;
    operator_config = {
        .group_id = 0, // operator must be in the same group to the timer
    };
    ESP_ERROR_CHECK(mcpwm_new_operator(&operator_config, &oper));

    ESP_LOGI(LOGTAG, "Connect timer and operator");
    ESP_ERROR_CHECK(mcpwm_operator_connect_timer(oper, timer));

    ESP_LOGI(LOGTAG, "Create comparator and generator from the operator");
    mcpwm_cmpr_handle_t comparator = NULL;
    mcpwm_comparator_config_t comparator_config = {
        .flags.update_cmp_on_tez = true,
    };
    ESP_ERROR_CHECK(mcpwm_new_comparator(oper, &comparator_config, &comparator));

    mcpwm_gen_handle_t generator = NULL;
    mcpwm_generator_config_t generator_config = {
        .gen_gpio_num = SERVO_PULSE_GPIO,
    };
    ESP_ERROR_CHECK(mcpwm_new_generator(oper, &generator_config, &generator));

    // set the initial compare value, so that the servo will spin to the center position
    ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(comparator, example_angle_to_compare(0)));

    ESP_LOGI(LOGTAG, "Set generator action on timer and compare event");
    // go high on counter empty
    ESP_ERROR_CHECK(mcpwm_generator_set_action_on_timer_event(generator,
                                                              MCPWM_GEN_TIMER_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, MCPWM_TIMER_EVENT_EMPTY, MCPWM_GEN_ACTION_HIGH)));
    // go low on compare threshold
    ESP_ERROR_CHECK(mcpwm_generator_set_action_on_compare_event(generator,
                                                                MCPWM_GEN_COMPARE_EVENT_ACTION(MCPWM_TIMER_DIRECTION_UP, comparator, MCPWM_GEN_ACTION_LOW)));

    ESP_LOGI(LOGTAG, "Enable and start timer");
    ESP_ERROR_CHECK(mcpwm_timer_enable(timer));
    ESP_ERROR_CHECK(mcpwm_timer_start_stop(timer, MCPWM_TIMER_START_NO_STOP));

    int angle = 0;
    int step = 2;
    while (1) {
        ESP_LOGI(LOGTAG, "Angle of rotation: %d", angle);
        ESP_ERROR_CHECK(mcpwm_comparator_set_compare_value(comparator, example_angle_to_compare(angle)));
        //Add delay, since it takes time for servo to rotate, usually 200ms/60degree rotation under 5V power supply
        vTaskDelay(pdMS_TO_TICKS(200));
        if ((angle + step) > 60 || (angle + step) < -60) {
            step *= -1;
        }
        angle += step;
    }
}
*/
