import React, { useEffect, useState, useRef } from "react";
// import "./AlarmsTable.css";

const AlarmsTable = () => {
  const [parameters, setParameters] = useState([]);
  const [logs, setLogs] = useState([]);
  const prevValues = useRef({});

  useEffect(() => {
    const fetchData = () => {
      fetch("https://wincc-api.vercel.app/parameters/")
        .then((res) => res.json())
        .then((data) => {
          setParameters(data);
          evaluateChanges(data);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getValue = (name, data) => {
    const item = data.find((param) => param.name === name);
    return item ? Number(item.value) : null;
  };

  const addLog = (message, type) => {
    setLogs((prev) => [
      { message, type, time: new Date().toLocaleString() },
      ...prev,
    ]);
  };

  const evaluateChanges = (data) => {
    const analogSensors = [
      {
        name: "inputs_phreading",
        label: "PH",
        minKey: "inputs_low.limit.PH",
        maxKey: "inputs_max.limit.PH",
      },
      {
        name: "inputs_temperaturereading",
        label: "TEMPERATURE",
        minKey: "inputs_low.limit.temp_1",
        maxKey: "inputs_max.limit.temp",
      },
      {
        name: "inputs_co2reading",
        label: "CO2",
        minKey: "co2normx",
        maxKey: "co2normx",
      },
    ];

    analogSensors.forEach((sensor) => {
      const value = getValue(sensor.name, data);
      const min = getValue(sensor.minKey, data);
      const max = getValue(sensor.maxKey, data);
      if (value === null || min === null || max === null) return;

      const range = max - min;
      const margin = range * 0.1;

      const prev = prevValues.current[sensor.name];
      prevValues.current[sensor.name] = value;

      if (value < min - margin || value > max + margin) {
        if (prev !== value)
          addLog(`${sensor.label} sensor is out of range!`, "error");
      } else if (
        (value >= min - margin && value < min) ||
        (value <= max + margin && value > max)
      ) {
        if (prev !== value)
          addLog(`${sensor.label} sensor is approaching limit.`, "warning");
      }
    });

    const boolSensors = [
      {
        name: "E_Stop",
        onMsg: "Emergency Stop is ACTIVE!",
        offMsg: "Emergency Stop is NOT active.",
      },
      {
        name: "stop",
        onMsg: "Stop command is issued!",
        offMsg: "System is not in stop mode.",
      },
      {
        name: "HMI_Tag_1",
        onMsg: "Automatic Mode is ON.",
        offMsg: "Manual Fan Mode is ON!",
      },
    ];

    boolSensors.forEach((sensor) => {
      const value = getValue(sensor.name, data);
      const prev = prevValues.current[sensor.name];
      prevValues.current[sensor.name] = value;

      if (prev !== value ) {
        if (value === 1) {
          addLog(sensor.onMsg, "error");
        } else {
          addLog(sensor.offMsg, "warning");
        }
      }
    });
  };

  return (
    <div className="alarms-table-container">
      <h2>Alarms Log</h2>
      <table className="alarms-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr
              key={index}
              className={log.type === "error" ? "row-error" : "row-warning"}
            >
              <td>{log.message}</td>
          

              <td>{log.type}</td>
        
              <td>{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlarmsTable;
