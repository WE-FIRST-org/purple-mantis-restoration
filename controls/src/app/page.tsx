'use client'
import React, { useEffect, useState } from "react";

const throttleRamp = 0.05;
const steerRamp = 0.07;

const data = {
  speed: 0, // [-100, 100] 
  turn: 0,  // [-100, 100]
  aim: 0,   // [-1, 1]
  shoot: 0, // {0, 1}
  shootSpeed: 0  // [0, 100]
}

export default function Home() {

  const [throttle, setThrottle] = useState(0);
  const [steer, setSteer] = useState(0);
  const [aim, setAim] = useState(0);
  const [shootSpeed, setShootSpeed] = useState(0);
  const [shoot, setShoot] = useState(false);
  const [currIter, nextiter] = useState(false);


  function driveFuncs(key: string, down: boolean): void {
    switch (key) {
      case 'w':
        if (down) setThrottle(1);
        if (!down && throttle == 1) setThrottle(0);
        break;
      case 's':
        if (down) setThrottle(-1);
        if (!down && throttle == -1) setThrottle(0);
        break;
      case 'a':
        if (down) setSteer(-1);
        if (!down && steer == -1) setSteer(0);
        break;
      case 'd':
        if (down) setSteer(1);
        if (!down && steer == 1) setSteer(0);
        break;
      case 'j':
        if (down) setAim(-1);
        if (!down && aim == -1) setAim(0);
        break;
      case 'k':
        if (down) setAim(1);
        if (!down && aim == 1) setAim(0);
        break;
      case 'h':
        if (down) setShoot(true);
        if (!down) setShoot(false);
        break;        
    }
  }
  useEffect(() => {
    setTimeout(() => {
      nextiter(!currIter)
    }, 5)

    if (throttle > 0) data.speed += (100 - data.speed) * throttleRamp;
    else if (throttle < 0) data.speed += (-100 - data.speed) * throttleRamp;
    else data.speed += (-data.speed) * throttleRamp;

    if (steer > 0) data.turn += (100 - data.turn) * steerRamp;
    else if (steer < 0) data.turn += (-100 - data.turn) * steerRamp;
    else data.turn += (-data.turn) * steerRamp;
    
    data.speed = Number(data.speed.toFixed(6));
    data.turn = Number(data.turn.toFixed(6));

    data.shoot = shoot ? 1 : 0;

    data.aim = aim;

    data.shootSpeed = shootSpeed;

    fetch(
      "http://127.0.0.1:8000",
      {
        method: "post",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/text",
        },
        body: JSON.stringify(data)
      }
    ).then(() => {}).catch(() => {});

  }, [currIter])

  function keybinds(event: React.KeyboardEvent): void {
    driveFuncs(event.key.toLowerCase(), event.type == "keydown");
  }

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
        </head>
        <body onKeyDown={keybinds} role='presentation' onKeyUp={keybinds}>
          <div className="w3-display-container w3-container w3-mobile" style={{ height: '100%', width: '100%', backgroundColor: "rgb(50,50,50)", maxWidth: "100%" }}>
            <div className="w3-display-topmiddle" style={{ height: '44px', width: '90%' }}>
              <div className="" style={{ height: '20px' }}></div>
              <div className="w3-border" style={{ height: '24px', width: '100%' }}>
                <div style={{
                  height: '22px', width: Math.abs(data.speed) + '%',
                  backgroundColor: `rgb(${255 * (data.speed > 0 ? 0 : 1)},0 ,${200 * (data.speed > 0 ? 1 : 0)})`
                }}></div>
              </div>

              <div className="w3-border" style={{ height: '24px', width: '100%', display: 'flex' }}>
                <div style={{
                  height: '22px', width: `${data.turn < 0 ? (100 + data.turn) / 2 : 50}%`,
                }}></div>

                <div style={{
                  height: '22px', width: `${data.turn < 0 ? -data.turn / 2 : 0}%`,
                  backgroundColor: `rgb(3,3,3)`
                }}></div>

                <div style={{
                  height: '22px', width: `${data.turn > 0 ? data.turn / 2 : 0}%`,
                  backgroundColor: `rgb(3,3,3)`
                }}></div>
              </div>
            </div>



            <div className="w3-display-left w3-container" id='power' style={{ width: '50%', padding: '0px', maxWidth: '400px' }}>
              <div className='w3-container' style={{ width: '100%', padding: '0px' }}>
                <div className='w3-row' style={{ width: '100%', display: 'flex' }} >
                  <div className='w3-col w3-container' style={{ maxWidth: '4em', width: '2em', flexGrow: '1' }}></div>
                  <div className='w3-col w3-third w3-container' style={{ padding: '0px', flexGrow: '0' }} >
                    <button className="w3-circle w3-ripple w3-grey" id="w" style={{ height: "5em", width: "5em", padding: '0px' }}> W </button>
                  </div>
                  <div className='w3-col w3-third w3-container' style={{ padding: '0px' }}>
                    <button className="w3-circle w3-ripple w3-grey" id="k" style={{ height: "5em", width: "5em", padding: '0px' }}> K </button>
                  </div>
                </div>
                <div className='w3-row' style={{ height: '0.5em', width: '100%', display: 'flex' }} ></div>
                <div className='w3-row' style={{ height: '5em', width: '100%', display: 'flex' }} >
                  <div className='w3-col w3-container' style={{ maxWidth: '4em', width: '2em', flexGrow: '1' }}></div>
                  <div className='w3-col w3-third w3-container' style={{ padding: '0px' }} >
                    <button className="w3-circle w3-ripple w3-grey" id="s" style={{ height: "5em", width: "5em", padding: '0px' }}> S </button>
                  </div>
                  <div className='w3-col w3-third w3-container' style={{ padding: '0px' }}>
                    <button className="w3-circle w3-ripple w3-grey" id="j" style={{ height: "5em", width: "5em", padding: '0px' }}> J </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="w3-display-right w3-container" id='steering' style={{ width: '50%', padding: '0px', maxWidth: '400px' }}>
            <div className='w3-container' style={{ width: '100%', padding: '0px' }}>
              <div className='w3-row' style={{ height: '5em', width: '100%', display: 'flex' }} ></div>
              <div className='w3-row' style={{ height: '5em', width: '100%', display: 'flex', marginLeft: 'auto', alignItems: 'flex-end' }}>
                <div className='w3-col w3-third w3-container' style={{ padding: '0px' }} >
                  <button className="w3-circle w3-ripple w3-grey w3-col w3-third w3-right" id="a" style={{ height: "5em", width: "5em", textAlign: 'center', padding: '0px' }}> A </button>
                </div>
                <div className='w3-col w3-third w3-container' style={{ padding: '0px' }}>
                  <button className="w3-circle w3-ripple w3-grey w3-col w3-third w3-right" id="d" style={{ height: "5em", width: "5em", textAlign: 'center', padding: '0px' }}> D </button>
                </div>
                <div className='w3-col w3-container' style={{ width: '2em', flexGrow: '1' }}></div>
              </div>
              <div className='w3-row' style={{ height: '1em' }} ></div>
              <div className='w3-row' style={{ display: 'flex', marginLeft: 'auto' }}>
                <div className='w3-col w3-container' style={{ width: '4em', flexGrow: '1' }}></div>
                <div className='w3-col w3-quarter w3-container' style={{ padding: '0px', flexGrow: '0.5' }}>
                  <button className="w3-circle w3-ripple w3-grey" id="h" style={{ height: "5em", width: "5em", padding: '0px' }}> H </button>
                </div>
                <div className='w3-col w3-container' style={{ width: '2em', flexGrow: '1' }}></div>
              </div>
            </div>
          </div>

          <div className="w3-display-bottommiddle w3-container" style={{ width: '75%' }}>
            <div className='w3-col'>
              <input type="range" min="0" max="100" defaultValue="0" className="slider" onChange={e => setShootSpeed(Number(e.target.value))} id="myRange" style={{ width: '100%' }} />
              <div className="w3-row" style={{ height: '20px' }}></div>
            </div>
          </div>
        </body>
      </html >
    </>
  );
}
