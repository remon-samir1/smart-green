
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
    phValues: { current: 0, min: 0, max: 0 },
    co2Values: { current: 0, min: 0, max: 0 },
    temperatureValues: { current: 0, min: 0, max: 0 }
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
          },
          phValues: {
            current: getValue(data, "inputs_phreading"),
            min: getValue(data, "inputs_low.limit.PH"),
            max: getValue(data, "inputs_max.limit.PH")
          },
          co2Values: {
            current: getValue(data, "inputs_co2reading"),
            min: getValue(data, "inputs_low.limit.co2"),
            max: getValue(data, "inputs_max.limit.co2")
          },
          temperatureValues: {
            current: getValue(data, "inputs_temperaturereading"),
            min: getValue(data, "inputs_low.limit.temp"),
            max: getValue(data, "inputs_max.limit.temp")
          }
        });
      } catch (error) {
        console.error("Error fetching system data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="box-container">
    
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

      <BoxComponent
        title="Lights"
        value={systemStatus.lights}
        hmiTag={systemStatus.hmiTag}
        deviceType="lights"
        cycleTime={systemStatus.lightsCycleTime}
      />

      {/* New Box - pH Values */}
      <div className="box">
        <h3 className="box-title">PH Values</h3>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Current PH:</strong> {systemStatus.phValues.current}</p>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Min PH:</strong> {systemStatus.phValues.min}</p>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Max PH:</strong> {systemStatus.phValues.max}</p>
      </div>

      <div className="box">
        <h3 className="box-title">CO2 Values</h3>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Current CO2:</strong> {systemStatus.co2Values.current}</p>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Min CO2:</strong> {systemStatus.co2Values.min}</p>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Max CO2:</strong> {systemStatus.co2Values.max}</p>
      </div>

      <div className="box">
        <h3 className="box-title">Temperature Values</h3>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Current Temperature:</strong> {systemStatus.temperatureValues.current}</p>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Min Temperature:</strong> {systemStatus.temperatureValues.min}</p>
        <p style={{display:'flex', justifyContent:'center' , alignItems:'center' , gap:'15px'}}><strong>Max Temperature:</strong> {systemStatus.temperatureValues.max}</p>
      </div>
    </div>
  );
}

export default Boxes;
