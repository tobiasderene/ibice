// Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';
import ibicesImg from '../assets/ibices.jpg';

export default function Hero({ id }) {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  // Preload de imagen
  useEffect(() => {
    const img = new Image();
    img.src = ibicesImg;
    img.onload = () => setLoaded(true);
  }, []);

  // Detectar entrada y salida del viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // entra o sale del viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animar texto cuando se hace visible
  useEffect(() => {
    if (isVisible && loaded) {
      const timer = setTimeout(() => setShowText(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isVisible, loaded]);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`hero-parallax ${loaded ? 'loaded' : ''}`}
    >
      {/* Placeholder */}
      {!loaded && (
        <div className="hero-placeholder">
          <div className="spinner" />
        </div>
      )}

      {/* Fondo */}
      <div
        className={`hero-background ${isVisible ? 'visible' : ''}`}
        style={{
          backgroundImage: loaded ? `url(${ibicesImg})` : 'none',
          opacity: loaded && isVisible ? 1 : 0,
        }}
      />

      {/* Contenido */}
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-slogan-container">
          <span className={`hero-slogan first ${showText ? 'visible' : ''}`}>
            Alcancemos la cima.
          </span>
          <span className={`hero-slogan second ${showText ? 'visible' : ''}`}>
            Juntos.
          </span>
        </h1>
      </div>
    </div>
  );
}
