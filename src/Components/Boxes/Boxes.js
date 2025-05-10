import './Boxes.css';
import React, { useState, useEffect } from "react";
import BoxComponent from "./BoxComponent";

function App() {
  const [systemStatus, setSystemStatus] = useState({
    fan: 0,
    heater: 0,
    pump: 0,
    lights: 0,
    stop: 1, // 1 if system is stopped, 0 if system is running
    hmiTag: 0, // 0 for manual, 1 for automatic
    pumpCycleTime: { total: 0, remaining: 0 }, // pump cycle times
    lightsCycleTime: { total: 0, remaining: 0 }, // lights cycle times
  });

  useEffect(() => {
    // Simulation of fetching from API
    const fetchData = async () => {
      setSystemStatus({
        fan: 1,  // fan is on
        heater: 0,  // heater is off
        pump: 1,  // pump is on
        lights: 1,  // lights are on
        stop: 0, // system running
        hmiTag: 0, // manual mode
        pumpCycleTime: { total: 120, remaining: 30 },  // pump cycle times
        lightsCycleTime: { total: 180, remaining: 45 },  // lights cycle times
      });
    };

    fetchData();
  }, []);

  return (
    <div className="box-container">
      {/* Box 1 - System Status */}
      <div className="box">
        <h3 className="box-title">System Status</h3>
        <div className={`icon icon-system-${systemStatus.stop === 0 ? "on" : "off"}`}></div>
        <p className="info-text">
          System is {systemStatus.stop === 0 ? "Running" : "Stopped"}
        </p>
      </div>

      {/* Box 2 - Fan */}
      <BoxComponent
        title="Fan"
        value={systemStatus.fan}
        hmiTag={systemStatus.hmiTag}
        deviceType="fan"
      />

      {/* Box 3 - Heater */}
      <BoxComponent
        title="Heater"
        value={systemStatus.heater}
        hmiTag={systemStatus.hmiTag}
        deviceType="heater"
      />

      {/* Box 4 - Pump */}
      <BoxComponent
        title="Pump"
        value={systemStatus.pump}
        hmiTag={systemStatus.hmiTag}
        deviceType="pump"
        cycleTime={systemStatus.pumpCycleTime}
      />

      {/* Box 5 - Lights */}
      <BoxComponent
        title="Lights"
        value={systemStatus.lights}
        hmiTag={systemStatus.hmiTag}
        deviceType="lights"
        cycleTime={systemStatus.lightsCycleTime}
      />
    </div>
  );
}

export default App;
