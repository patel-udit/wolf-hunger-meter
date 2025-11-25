import { useState } from "react";
import WolfMeter from "./WolfMeter";
import "./styles.css";
import wbw2Logo from "./assets/wbw2-logo.jpg";


function App() {
  const [mode, setMode] = useState("demo");
  const [demoCPH, setDemoCPH] = useState(800);

  return (
    <>
      <header className="amazon-header">
        <div className="amazon-logo">Wolf Hunger Meter</div>
      </header>

      <div className="app-root">
        <header className="app-header">
          <h1>PID Performance Dashboard</h1>
          {/* <p className="subtitle">
            Visual hourly CPH tracker with animated wolf motivation.
          </p> */}
        </header>

        <div className="top-bar">
          <div className="mode-toggle">
            <button
              className={mode === "demo" ? "mode-btn active" : "mode-btn"}
              onClick={() => setMode("demo")}
            >
              Demo Mode
            </button>
            <button
              className={mode === "live" ? "mode-btn active" : "mode-btn"}
              onClick={() => setMode("live")}
            >
              Live API Mode
            </button>
          </div>

          {mode === "demo" && (
            <div className="demo-controls">
              <label htmlFor="cph-slider">
                Demo CPH: <strong>{demoCPH}</strong>
              </label>
              <input
                id="cph-slider"
                type="range"
                min="0"
                max="1800"
                step="10"
                value={demoCPH}
                onChange={(e) => setDemoCPH(Number(e.target.value))}
              />
            </div>

          )}

        </div>

        <div className="wolf-container-outer">
          <WolfMeter mode={mode} demoCPH={demoCPH} />
        </div>
      </div>
      {/* <div className="amazon-watermark">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
          />
      </div> */}
      <div className="site-watermark">
        <img src={wbw2Logo} alt="WBW2 Logo" />
      </div>
    </>
  );
}

export default App;
