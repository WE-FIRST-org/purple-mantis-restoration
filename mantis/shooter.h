#ifndef SHOOTER_H
#define SHOOTER_H
#include <ESP32Servo.h>

class Shooter {
    private:
    Servo wheel0;
    Servo wheel1;
    Servo kicker;
    
    public:

    void setup(int p0, int p1, int p2);

    void setSpeed(int speed);
    void shoot();
    void unshoot();
};

#endif
