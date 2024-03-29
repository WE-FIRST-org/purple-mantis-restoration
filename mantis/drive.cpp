#include <ESP32Servo.h>
#include "drive.h"
#define MAX_SPEED 0.25 // max speed: 0 -> 1.0


void Drive::setup(int p0, int p1, int p2, int p3) {
    l0.setPeriodHertz(500);    // standard 50 hz = 20ms
    l1.setPeriodHertz(500);    
    r0.setPeriodHertz(500);    
    r1.setPeriodHertz(500);    

    #ifndef SERIALBEGIN
    #define SERIALBEGIN
    Serial.begin(9600);
    #endif

    // dont use port 0, its used for boot as well so it acts weird
    l0.attach(p0, 700, 2300); // attaches the servo on pin 18 to the servo object
    l1.attach(p1, 700, 2300); // attaches the servo on pin 18 to the servo object
    r0.attach(p2, 700, 2300); // attaches the servo on pin 18 to the servo object
    r1.attach(p3, 700, 2300); // attaches the servo on pin 18 to the servo object
    }

void Drive::arcade(double speed, double turn) {
    speed *= MAX_SPEED; // max speed in drive.h
    turn *= MAX_SPEED;
    double leftfp = speed + turn;
    double rightfp = turn - speed; // simulates reversed drive direction as well
    

    /**
     * limits to 0 -> 180
    */
    leftfp *= 90;
    rightfp *= 90;
    
    leftfp += 90;
    rightfp += 90;
    
    int left = leftfp;
    if(left > 180) left = 180;
    if(left < 0) left = 0;
    int right = rightfp; 
    if(right > 180) right = 180;
    if(right < 0) right = 0;

    /*
    * 
    */
	
    l0.write(left);
    l1.write(left);
    r0.write(right);
    r1.write(right);
}


void Drive::loop() {
    l0.write(0);
    l1.write(60);
    r0.write(20);
    r1.write(180);
}

