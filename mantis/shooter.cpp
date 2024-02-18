#include <ESP32Servo.h>
#include "shooter.h"

void Shooter::setup(int p0, int p1, int p2) {
    wheel0.setPeriodHertz(500);
    wheel1.setPeriodHertz(500);
    kicker.setPeriodHertz(500);

    #ifndef SERIALBEGIN
    #define SERIALBEGIN
    Serial.begin(9600);
    #endif

    wheel0.attach(p0, 700, 2300);
    wheel1.attach(p1, 700, 2300);
    kicker.attach(p2, 700, 2300);
}

void Shooter::setSpeed(int speed) {
    speed *= 90;
    speed /= 100;
    speed += 90;
    wheel0.write(speed);
    wheel1.write(speed);
}

void Shooter::shoot() {
    kicker.write(180); // 180 pwm is max
}

void Shooter::unshoot() {
    kicker.write(90); // 0 pwm is -max, 90 is 0
    // if this project wasn't being speedrun / so small, I would probably max a lower level, separate api to abstract the PWM interface
}



