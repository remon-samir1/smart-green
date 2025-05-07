import React, { useEffect, useRef } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Nav = () => {
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  useGSAP(() => {
    gsap.from(logoRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from(linksRef.current, {
      opacity: 0,
      x: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  });

  return (
    <div className='NavBar'>
      <div className="logo" ref={logoRef}>
        <img src={require('../../Images/smart.png')} width={80} alt="smart" />
      </div>
      <div className="links">
        <NavLink to='/' ref={el => linksRef.current[0] = el}>Home</NavLink>
        <NavLink to='/charts' ref={el => linksRef.current[1] = el}>Charts</NavLink>
      </div>
    </div>
  );
}

export default Nav;
