# purple-mantis-restoration
restoring team 4814's 2013 FRC robot purple mantis using an ESP32 

## Usage




## Structure
code for purple mantis is under the mantis/ directory

the control client is under the controls/ directory

original low level servo drivers that were written, but not used are in the ESP-IDF-driver/ director

## Building the code

- use the following bash commands 

### build the bot code
- download arduino-cli
- run the following
```bash
cd mantis
arduino-cli core update-index
arduino-cli board listall
arduino-cli core install esp32:esp32
arduino-cli lib install ESP32Servo
```

- then, run `commands.sh` to compile and upload the code
```bash
./commands.sh
```
- **note: this only works if the esp32 is on port /dev/ttyUSB0 (linux only)**
- otherwise, use the following commands to compile and upload (with the right port)
- check `arduino-cli board list` to find the right port 
```bash
arduino-cli compile --fqbn esp32:esp32:nodemcu-32s .

arduino-cli upload -p <port> --fqbn esp32:esp32:nodemcu-32s .
```

### build the control client
  - requires node
```bash
cd controls
npm install
npm run dev 
```
- then, go to `http://localhost:3000` to access the controller
- make sure that the you are connected to the `purpol mantis` wifi network, and the controller should work  
