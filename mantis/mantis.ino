#include <ESP32Servo.h>
#include "drive.h"
#include "api.h"
#include "SPIFFS.h"
#include "ESPAsyncWebServer.h"

TaskHandle_t api_handler;
AsyncWebServer site_server(3000); 

void setup() {
    ESP32PWM::allocateTimer(0);
    ESP32PWM::allocateTimer(1);
    ESP32PWM::allocateTimer(2);
    ESP32PWM::allocateTimer(3);
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
    /**if(!SPIFFS.begin()){
         Serial.println("cant mount SPIFFS");
         delay(20000);
         return;
    }
    */
}
 
void loop() {
}
