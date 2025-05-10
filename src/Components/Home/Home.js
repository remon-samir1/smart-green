import React, { useRef, useEffect } from 'react';
import './Home.css';
import Nav from '../NavBar/Nav';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnalogAlarms from '../AnalogAlarms/AnalogAlarms';
import BoolAlarms from '../BoolAlarms/BoolAlarms';
import AlarmsTable from '../AlarmsTable/AlarmsTable';
import Boxes from '../Boxes/Boxes';

const Home = () => {
  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.from(imgRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.5
    });
  });

  return (
    <>
      <Nav />
      <div className='Home'>
        <div className="content">
          <div className="img" ref={imgRef}>
            <img src={require('../../Images/greenhouse_diagram.png')} alt="smart" />
          </div>
        </div>
    {/* <AlarmsTable/> */}
    <Boxes/>
      </div>
    </>
  );
}

export default Home;
