import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <h1>MiLogo</h1>
        </div>

        <nav className="nav">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>Inicio</a>
          <a href="#productos" onClick={(e) => { e.preventDefault(); scrollToSection('productos'); }}>Productos</a>
          <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}>Beneficios</a>
          <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}>Sobre Nosotros</a>
        </nav>

        <button className="cta-button">Comenzar</button>
      </div>
    </header>
  );
}
