import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo">
            <h1>MiLogo</h1>
          </div>
          
          <nav className="nav">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <button className="cta-button">Comenzar</button>
        </div>
      </header>
    </>
  );
}