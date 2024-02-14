#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "servo.c"

void app_main(void)
{
  /*
   * 697 -> 2310 range
   * 1454 us -> 1550 us for the jaguar is the deadband
   * will not move if in this range
   */

  int motors[] = {0, 2, 4};
  printf("dasdsadskdkasdskad %d \n", sizeof(motors) / 4); 
  initMotorControl(motors, sizeof(motors)/4);

  double val = 0;
  double val2 = 0;
  double diff = 0.05;
  double diff2 = 0.2;
  //just some testing
  while(1) {
    setPWMSignal(0, val, 697, 2310);
    setPWMSignal(4, val2, 697, 2310);
    vTaskDelay(pdMS_TO_TICKS(300));
    val += diff;
    if(val >= 1) diff -= 0.1;
    if(val <= -1) diff += 0.1;
  
    val2 += diff2;
    if(val2 >= 1) diff2 -= 0.4;
    if(val2 <= -1) diff2 += 0.4;

  }
  
  

}
