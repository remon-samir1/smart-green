
import React, { useEffect, useState } from 'react';
import './ChartsPage.css';
import CO2Chart from '../Charts/Co2Chart/Co2Chart';
import NavBar from '../NavBar/NavBar';
import PhreadingChart from '../Charts/PhreadingChart/PhreadingChart';
import TempReading from '../Charts/TempReading/TempReading';

const ChartsPage = () => {

  return (
    <div className="ChartsPage">
      <NavBar/>
      <div style={{marginTop:'30px'}} className="glass">

    <CO2Chart/>
      </div>
      <div style={{marginTop:'30px'}} className="glass">

    <PhreadingChart/>
      </div>
      <div style={{marginTop:'30px'}} className="glass">

    <TempReading/>
      </div>
    </div>
  );
};

export default ChartsPage;
