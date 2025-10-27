// Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';
import ibicesImg from '../assets/ibices.jpg';

export default function Hero({ id }) {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [showJuntos, setShowJuntos] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false); // 👈 fade-in inicial

  // preload imagen
  useEffect(() => {
    const img = new Image();
    img.src = ibicesImg;
    img.onload = () => {
      setLoaded(true);
      setTimeout(() => setVisible(true), 100); // 👈 pequeño delay para la transición
    };
  }, []);

  // movimiento parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // animación de texto
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowJuntos(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`hero-parallax ${loaded ? 'loaded' : ''}`}
    >
      {!loaded && (
        <div className="hero-placeholder">
          <div className="spinner" />
        </div>
      )}

      <div
        className={`hero-background ${visible ? 'visible' : ''}`}
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          backgroundImage: loaded ? `url(${ibicesImg})` : 'none',
        }}
      />

      <div className="hero-overlay" />

      <div
        className="hero-content"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <h1 className="hero-slogan-container">
          <span className={`hero-slogan first ${showJuntos ? 'visible' : ''}`}>
            Alcancemos la cima.
          </span>
          <span className={`hero-slogan second ${showJuntos ? 'visible' : ''}`}>
            Juntos.
          </span>
        </h1>
      </div>
    </div>
  );
}
