import React, { useEffect, useState } from "react";

const AnalogAlarms = () => {
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    fetch("https://wincc-api.vercel.app/parameters/")
      .then((res) => res.json())
      .then((data) => setParameters(data));
  }, []);

  const getValueByName = (name) => {
    const item = parameters.find((param) => param.name === name);
    return item ? Number(item.value) : null;
  };

  const evaluateStatus = (value, min, max) => {
    const range = max - min;
    const tenPercent = range * 0.1;

    if (value < min - tenPercent || value > max + tenPercent) {
      return { status: "error", message: " Sensor value is out of range!" };
    } else if (
      (value >= min - tenPercent && value < min) ||
      (value <= max + tenPercent && value > max)
    ) {
      return { status: "warning", message: " Sensor value is approaching limit." };
    } else {
      return { status: "normal", message: "Status is normal" };
    }
  };

  const sensors = [
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sensor Status</h2>
      {sensors.map((sensor) => {
        const value = getValueByName(sensor.name);
        const min = getValueByName(sensor.minKey);
        const max = getValueByName(sensor.maxKey);
        if (value === null || min === null || max === null) return null;

        const status = evaluateStatus(value, min, max);

        return (
          <div key={sensor.name} style={{ marginBottom: "15px" }}>
            <strong>{sensor.label}:</strong> {value}
            {status.status !== "normal" && (
              <p
                style={{
                  color: status.status === "error" ? "red" : "orange",
                  fontWeight: "bold",
                }}
              >
                {status.message}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnalogAlarms;





