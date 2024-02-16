#include <ESP32Servo.h>
#include "drive.h"
#include "api.h"

Drive drive;
TaskHandle_t api_handler;

void setup() {
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    ESP32PWM::allocateTimer(2);
    ESP32PWM::allocateTimer(3);
    drive.setup(4, 16, 5, 17); // left, left, right, right
    APISetup();
    xTaskCreatePinnedToCore(
                    APIRead,   /* Task function. */
                    "api handler",     /* name of task. */
                    10000,       /* Stack size of task */
                    NULL,        /* parameter of the task */
                    1,           /* priority of the task */
                    &api_handler,/* Task handle to keep track of created task */
                    1);          /* pin task to core 1 */
    delay(500); 

}
 
void loop() {
    drive.arcade(0.5, -0.2); // speed, turning rate

}
