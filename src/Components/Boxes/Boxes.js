


import './Boxes.css';
import React, { useState, useEffect } from "react";
import BoxComponent from "./BoxComponent";

function Boxes() {
  const [systemStatus, setSystemStatus] = useState({
    fan: 0,
    heater: 0,
    pump: 0,
    lights: 0,
    stop: 1,
    hmiTag: 0,
    pumpCycleTime: { total: 0, remaining: 0 },
    lightsCycleTime: { total: 0, remaining: 0 },
  });

  // Helper function to extract value by name from API data
  const getValue = (data, name) => {
    const found = data.find(item => item.name === name);
    return found ? Number(found.value) : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://wincc-api.vercel.app/parameters/");
        const data = await response.json();

        setSystemStatus({
          fan: getValue(data, "fan"),
          heater: getValue(data, "heater"),
          pump: getValue(data, "waterpump"),
          lights: getValue(data, "settimeforlights") > 0 ? 1 : 0, // consider lights ON if cycle is set
          stop: getValue(data, "stop"),
          hmiTag: getValue(data, "HMI_Tag_1"),
          pumpCycleTime: {
            total: getValue(data, "settimeforwater"),
            remaining: getValue(data, "output_remainforwateringtime")
          },
          lightsCycleTime: {
            total: getValue(data, "settimeforlights"),
            remaining: getValue(data, "output_remainforlightstime_1")
          }
        });
      } catch (error) {
        console.error("Error fetching system data:", error);
      }
    };

    fetchData(); // Fetch once at start

    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
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

export default Boxes;
