import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Cierra el menú al hacer click
    }
  };

  // Evita scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <h1>MiLogo</h1>
        </div>

        {/* Menú desktop */}
        <nav className="nav desktop-nav">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>Inicio</a>
          <a href="#productos" onClick={(e) => { e.preventDefault(); scrollToSection('productos'); }}>Servicios</a>
          <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}>Beneficios</a>
          <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}>Sobre Nosotros</a>
        </nav>

        <button className="cta-button desktop-cta">Comenzar</button>

        {/* Hamburger button */}
        <button 
          className={`hamburger ${menuOpen ? 'open' : ''} ${scrolled ? 'scrolled' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú mobile */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav">
            <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>Inicio</a>
            <a href="#productos" onClick={(e) => { e.preventDefault(); scrollToSection('productos'); }}>Productos</a>
            <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}>Beneficios</a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}>Sobre Nosotros</a>
            <button className="cta-button mobile-cta">Comenzar</button>
          </nav>
        </div>
      </div>
    </header>
  );
}