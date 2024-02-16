#ifndef DRIVE_H
#define DRIVE_H

class Drive {
    private:

    Servo l0;
    Servo l1;
    Servo r0;
    Servo r1;

	public:

	void setup(int p0, int p1, int p2, int p3); // setup

	void arcade(double speed, double turn); // arcade drive

	void loop(); // test func
};

#endif
