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
        <div className="w3-display-container w3-container" style={{ height: '100%', width: '100%', backgroundColor: "rgb(50,50,50)" }}>
          <div className="w3-display-topmiddle" style={{ height: '44px', width: '90%' }}>
            <div className="" style={{ height: '20px' }}></div>
            <div className="w3-border" style={{ height: '24px', width: '100%' }}>
              <div className="w3-blue" style={{ height: '24px', width: throttle + '%' }}></div>
            </div>
          </div>

          <div className='w3-display-left w3-container' id='power'>
            <div className="w3-row" style={{width: '100%'}}>
              <div className='w3-col w3-twothird'>
                <button className="w3-circle w3-grey" id="w" style={{ height: "100px", width: "100px" }}> W </button>
                <br /><div style={{ height: "10%" }}></div><br />
                <button className="w3-circle w3-grey" id="s" style={{ height: "100px", width: "100px" }}> S </button>
              </div>
              <div className="w3-col w3-third">
                <div style={{ height: "3%" }}></div><br />
                <button className="w3-circle w3-grey" id="k" style={{ height: "80px", width: "80px" }}> K </button>
                <br /><div style={{ height: "3%" }}></div><br />
                <button className="w3-circle w3-grey" id="j" style={{ height: "80px", width: "80px" }}> J </button>
              </div>
            </div>
          </div>
          <div className="w3-display-right w3-container" id='steering' style={{ width: '280px', padding: '0px' }}>
            <div className='w3-container' style={{}} >
              <div className='w3-row' style={{ height: '150px' }} ></div>
              <button className="w3-circle w3-grey" id="a" style={{ height: "100px", width: "100px", display: "inline-block" }}> A </button>
              <div style={{ height: '10px', width: '10%', display: "inline-block" }}></div>
              <button className="w3-circle w3-grey" id="d" style={{ height: "100px", width: "100px", display: "inline-block" }}> D </button>
              <div className='w3-row' style={{ height: '30px' }} ></div>
              <div className='w3-row'>
                <div className='w3-col w3-third w3-container'></div>
                <div className='w3-col w3-third w3-container'>
                  <button className="w3-circle w3-grey" id="h" style={{ height: "100px", width: "100px" }}> H </button>
                </div>
                <div className='w3-col w3-third w3-container' />
              </div>
            </div>
          </div>

          <div className="w3-display-bottommiddle w3-container" style={{ width: '75%' }}>
            <div className='w3-col'>
            <input type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange" style={{ width: '100%' }} />
            <div className="w3-row" style={{height: '50px'}}></div>
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