import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../assets/Ibice Logo Color.png'; // 👈 Importa tu logo

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.body.scrollHeight;

      if (scrollY < 50) {
        setScrolled(false);
        return;
      }

      if (scrollY + windowH >= docH - 100) {
        setScrolled(false);
        return;
      }

      setScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          {/* 👇 Reemplazamos el h1 por el logo */}
          <img 
            src={logo} 
            alt="Ibice Solutions Logo" 
            className="logo-img"
          />
        </div>

        {/* Menú desktop */}
        <nav className="nav desktop-nav">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>Inicio</a>
          <a href="#productos" onClick={(e) => { e.preventDefault(); scrollToSection('productos'); }}>Servicios</a>
          <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }}>Beneficios</a>
          <a href="#aboutus" onClick={(e) => { e.preventDefault(); scrollToSection('aboutus'); }}>Sobre Nosotros</a>
        </nav>

        <button 
          className="cta-button desktop-cta" 
          onClick={(e) => { 
            e.preventDefault(); 
            scrollToSection('cta'); 
          }}
        >
          Comenzar
        </button>
        
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
            <a href="#aboutus" onClick={(e) => { e.preventDefault(); scrollToSection('aboutus'); }}>Sobre Nosotros</a>
            <button className="cta-button mobile-cta" onClick={(e) => { e.preventDefault(); scrollToSection('cta'); }}>Comenzar</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
