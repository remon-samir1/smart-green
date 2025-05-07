import React, { useEffect, useRef } from 'react';
import './ChartsPage.css';
import CO2Chart from '../Charts/Co2Chart/Co2Chart';
import PhreadingChart from '../Charts/PhreadingChart/PhreadingChart';
import TempReading from '../Charts/TempReading/TempReading';
import Nav from '../NavBar/Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ChartsPage = () => {
  const chartRefs = useRef([]);

  useGSAP(() => {
    chartRefs.current.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%', 
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });
  });

  return (
    <>
      <Nav />
      <div className="ChartsPage">
        <div style={{ marginTop: '30px' }} className="glass" ref={el => chartRefs.current[0] = el}>
          <CO2Chart />
        </div>
        <div style={{ marginTop: '30px' }} className="glass" ref={el => chartRefs.current[1] = el}>
          <PhreadingChart />
        </div>
        <div style={{ marginTop: '30px' }} className="glass" ref={el => chartRefs.current[2] = el}>
          <TempReading />
        </div>
      </div>
    </>
  );
};

export default ChartsPage;
