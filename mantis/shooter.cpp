#include <ESP32Servo.h>
#include "shooter.h"

void Shooter::setup(int p0, int p1, int p2) {
    wheel0.setPeriodHertz(50);
    wheel1.setPeriodHertz(50);
    kicker.setPeriodHertz(50);

    #ifndef SERIALBEGIN
    #define SERIALBEGIN
    Serial.begin(9600);
    #endif

    wheel0.attach(p0, 690, 2310);
    wheel1.attach(p1, 690, 2310);
    kicker.attach(p2, 690, 2310);
}

void Shooter::setSpeed(int speed) {
    speed *= 180;
    speed /= 100;
    wheel0.write(speed);
    wheel1.write(speed);
}

void Shooter::shoot() {
    kicker.write(90);
}

void Shooter::unshoot() {
    kicker.write(0);
}



