
arduino-cli compile --fqbn esp32:esp32:nodemcu-32s .

acli upload -p /dev/ttyUSB0 --fqbn esp32:esp32:nodemcu-32s .

curl -X POST http://192.168.4.1:8000 -d "{\"speed\":100}" -m 0.15
