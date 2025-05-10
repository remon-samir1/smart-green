import React, { useEffect, useState } from "react";
import "./DigitalAlarms.css";

const BoolAlarms = () => {
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    fetch("https://wincc-api.vercel.app/parameters/")
      .then((res) => res.json())
      .then((data) => setParameters(data));
  }, []);

  const getValue = (key) => {
    const item = parameters.find((param) => param.name === key);
    return item ? Number(item.value) : 0;
  };

  const alarms = [
    {
      key: "E_Stop",
      labelOn: "Emergency Stop is ACTIVE!",
      labelOff: "Emergency Stop is NOT active.",
    },
    {
      key: "stop",
      labelOn: "Stop command is issued!",
      labelOff: "System is not in stop mode.",
    },
    {
      key: "manualfanon",
      labelOn: "Manual Fan Mode is ON!",
      labelOff: "Manual Fan Mode is OFF.",
    },
  ];

  return (
    <div className="alarm-container">
      {alarms.map((alarm) => {
        const value = getValue(alarm.key);
        const isActive = value === 1;

        return (
          <div
            className={isActive ? "alarm-warning" : "alarm-normal"}
            key={alarm.key}
          >
            {isActive ? alarm.labelOn : alarm.labelOff}
          </div>
        );
      })}
    </div>
  );
};

export default BoolAlarms;
