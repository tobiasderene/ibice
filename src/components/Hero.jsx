// Hero.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import ibicesImg from '../assets/ibices.jpg';

export default function Hero({ id }) {
  const [scrollY, setScrollY] = useState(0);
  const [showJuntos, setShowJuntos] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowJuntos(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // preload de imagen
  useEffect(() => {
    const img = new Image();
    img.src = ibicesImg;
    img.onload = () => setLoaded(true);
  }, []);

  const maxScroll = window.innerHeight * 0.8;
  const blurAmount = Math.min((scrollY / maxScroll) * 10, 10);
  const opacity = Math.max(1 - scrollY / maxScroll, 0);

  return (
    <div
      id={id}
      className={`hero-parallax ${loaded ? 'loaded' : ''}`}
      style={{
        filter: `blur(${blurAmount}px)`,
        opacity: loaded ? opacity : 1,
        transition: 'filter 0.2s ease-out, opacity 0.5s ease-out',
      }}
    >
      {!loaded && <div className="hero-placeholder"><div className="spinner" /></div>}

      <div
        className="hero-background"
        style={{
          transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.02}px)`,
          height: `${120 + scrollY * 0.05}%`,
          backgroundImage: loaded ? `url(${ibicesImg})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <h1 className="hero-slogan-container">
          <span className={`hero-slogan first ${showJuntos ? 'visible' : ''}`}>Alcancemos la cima.</span>
          <span className={`hero-slogan second ${showJuntos ? 'visible' : ''}`}>Juntos.</span>
        </h1>
      </div>
    </div>
  );
}
