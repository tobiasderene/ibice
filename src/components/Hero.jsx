// Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';
import ibicesImg from '../assets/ibices.jpg';

export default function Hero({ id }) {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [showJuntos, setShowJuntos] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // 👈 nuevo estado

  // Preload imagen
  useEffect(() => {
    const img = new Image();
    img.src = ibicesImg;
    img.onload = () => setLoaded(true);
  }, []);

  // Detectar visibilidad del Hero
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Cuando entra en el viewport (al menos un poco visible)
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Movimiento parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Texto animado
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
        className={`hero-background ${isVisible ? 'visible' : ''}`}
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
