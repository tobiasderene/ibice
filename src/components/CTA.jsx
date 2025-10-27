// Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';
import ibicesImg from '../assets/ibices.jpg';

export default function Hero({ id }) {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  // preload imagen
  useEffect(() => {
    const img = new Image();
    img.src = ibicesImg;
    img.onload = () => setLoaded(true);
  }, []);

  // detectar cuando entra al viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // animar texto después de visible
  useEffect(() => {
    if (isVisible && loaded) {
      const timer = setTimeout(() => setShowText(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isVisible, loaded]);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`hero-parallax ${loaded ? 'loaded' : ''}`}
    >
      {/* Placeholder mientras carga */}
      {!loaded && (
        <div className="hero-placeholder">
          <div className="spinner" />
        </div>
      )}

      {/* Background */}
      <div
        className={`hero-background ${isVisible ? 'visible' : ''}`}
        style={{
          backgroundImage: loaded ? `url(${ibicesImg})` : 'none',
          opacity: loaded && isVisible ? 1 : 0,
        }}
      />

      {/* Contenido */}
      <div className="hero-content">
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
