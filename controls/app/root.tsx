import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import appStylesHref from "./app.css";
import w3css from "./w3.css";

import type { LinksFunction } from "@remix-run/node";
import { useState } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "stylesheet", href: w3css },
];

export default function App() {
  const [throttle, setThrottle] = useState(10);
  setThrottle;
  function keybinds(event: React.KeyboardEvent): void {
    console.log(event);
  }
  return (

    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body onKeyDown={keybinds} role='presentation' onKeyUp={keybinds}>
        <div className="w3-display-container w3-container w3-mobile" style={{ height: '100%', width: '100%', backgroundColor: "rgb(50,50,50)" , maxWidth: "100%"}}>
          <div className="w3-display-topmiddle" style={{ height: '44px', width: '90%' }}>
            <div className="" style={{ height: '20px' }}></div>
            <div className="w3-border" style={{ height: '24px', width: '100%' }}>
              <div className="w3-blue" style={{ height: '24px', width: throttle + '%' }}></div>
            </div>
          </div>

        

          <div className="w3-display-left w3-container" id='power' style={{ width: '50%', padding: '0px', maxWidth: '400px' }}>
            <div className='w3-container' style={{ width: '100%', padding: '0px' }}>
              <div className='w3-row' style={{ width: '100%', display: 'flex' }} >
                <div className='w3-col w3-container' style={{maxWidth: '4em', width: '2em', flexGrow: '1'}}></div>
                <div className='w3-col w3-third w3-container' style={{padding: '0px'}} >
                  <button className="w3-circle w3-ripple w3-grey" id="w" style={{ height: "5em", width: "5em", padding: '0px'}}> W </button>
                </div>
                <div className='w3-col w3-third w3-container' style={{padding: '0px'}}>
                  <button className="w3-circle w3-ripple w3-grey" id="k" style={{ height: "5em", width: "5em", padding: '0px'}}> K </button>
                </div>
              </div>
              <div className='w3-row' style={{ height: '22m', width: '100%', display: 'flex' }} ></div>
              <div className='w3-row' style={{ height: '5em', width: '100%', display: 'flex' }} >
                <div className='w3-col w3-container' style={{maxWidth: '4em', width: '2em', flexGrow: '1'}}></div>
                <div className='w3-col w3-third w3-container' style={{padding: '0px'}} >
                  <button className="w3-circle w3-ripple w3-grey" id="s" style={{ height: "5em", width: "5em", padding: '0px'}}> S </button>
                </div>
                <div className='w3-col w3-third w3-container' style={{padding: '0px'}}>
                  <button className="w3-circle w3-ripple w3-grey" id="j" style={{ height: "5em", width: "5em", padding: '0px'}}> J </button>
                </div>
               
              </div>
            </div>
          </div>

          <div className="w3-display-right w3-container" id='steering' style={{ width: '50%', padding: '0px', maxWidth: '400px' }}>
            <div className='w3-container' style={{ width: '100%', padding: '0px' }}>
              <div className='w3-row' style={{ height: '3em', width: '100%', display: 'flex' }} ></div>
              <div className='w3-row' style={{ height: '5em', width: '100%', display: 'flex', marginLeft: 'auto' }}> 
                <div className='w3-col w3-third w3-container' style={{padding: '0px'}} >
                  <button className="w3-circle w3-ripple w3-grey w3-col w3-third" id="a" style={{ height: "5em", width: "5em", textAlign: 'center', padding: '0px'}}> A </button>
                </div>
                <div className='w3-col w3-third w3-container' style={{padding: '0px'}}>
                  <button className="w3-circle w3-ripple w3-grey w3-col w3-third" id="d" style={{ height: "5em", width: "5em", textAlign: 'center', padding: '0px'}}> D </button>
                </div>
                <div className='w3-col w3-container' style={{maxWidth: '4em', width: '2em', flexGrow: '1'}}></div>
              </div>
              <div className='w3-row' style={{ height: '1em' }} ></div>
              <div className='w3-row'>
                <div className='w3-col w3-third w3-container' style={{padding: '0px'}}></div>
                <div className='w3-col w3-third w3-container' style={{ padding: '0px'}}>
                  <button className="w3-circle w3-ripple w3-grey" id="h" style={{ height: "5em", width: "5em", padding: '0px' }}> H </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w3-display-bottommiddle w3-container" style={{ width: '75%' }}>
            <div className='w3-col'>
              <input type="range" min="1" max="100" defaultValue="0" className="slider" id="myRange" style={{ width: '100%' }} />
              <div className="w3-row" style={{ height: '20px' }}></div>
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html >
  );
}