# purple-mantis-restoration
restoring team 4814's 2013 FRC robot purple mantis using an ESP32 

## Structure
code for purple mantis is under the mantis/ directory

the control client is under the mantis/client/ directory

Runs on an ESP32 using the Espruino javascript interpreter
- web controls are generated using Remix
- static files are then served using Espruino, alongside server side (ESP32) controls

## Building the code

- use the following bash commands 

- build the control client
  - requires node
```
cd controls
npm install
npm run build
```

- the static website is now in the `controls/public/build` directory


