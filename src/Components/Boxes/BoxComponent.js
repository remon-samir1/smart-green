import React from "react";

const BoxComponent = ({ title, value, hmiTag, deviceType, cycleTime }) => {
  const isManual = hmiTag === 0; 
  const isDeviceOn = value === 1; 

  return (
    <div className="box">
      <h3 className="box-title">{title}</h3>
      <div
        className={`icon icon-${deviceType} ${isDeviceOn ? "on" : "off"}`}
      ></div>
      <p className="info-text">{`${title} is ${isDeviceOn ? "On" : "Off"}`}</p>

      {cycleTime && (
        <div className="cycle-info">
          <p>Total Cycle Time: {cycleTime.total} mins</p>
          <p>Remaining Cycle Time: {cycleTime.remaining} mins</p>
        </div>
      )}

      {!isManual && (
        <button
          className="manual-button"
          disabled={!isDeviceOn}
        >
          {isDeviceOn ? "Off" : "On"}
        </button>
      )}
    </div>
  );
};

export default BoxComponent;
