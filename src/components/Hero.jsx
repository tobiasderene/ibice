import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [showJuntos, setShowJuntos] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowJuntos(true), 750);
    return () => clearTimeout(timer);
  }, []);

  const maxScroll = window.innerHeight * 0.8;
  const blurAmount = Math.min((scrollY / maxScroll) * 10, 10);
  const opacity = Math.max(1 - scrollY / maxScroll, 0);

  return (
    <div
      className="hero-parallax"
      style={{
        filter: `blur(${blurAmount}px)`,
        opacity,
        transition: 'filter 0.2s ease-out, opacity 0.2s ease-out',
      }}
    >
      {/* Fondo parallax */}
      <div
        className="hero-background"
        style={{
          transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.02}px)`,
          height: `${120 + scrollY * 0.05}%`,
        }}
      />

      {/* Texto */}
      <div
        className="hero-content"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
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

      {/* Nubes */}
      <div className="clouds-container">
        <div
          className="cloud cloud-1"
          style={{ transform: `translateX(${scrollY * 0.05}px)` }}
        ></div>
        <div
          className="cloud cloud-2"
          style={{ transform: `translateX(${scrollY * 0.1}px)` }}
        ></div>
        <div
          className="cloud cloud-3"
          style={{ transform: `translateX(${scrollY * 0.08}px)` }}
        ></div>
        <div
          className="cloud cloud-4"
          style={{ transform: `translateX(${scrollY * -0.04}px)` }}
        ></div>
        <div
          className="cloud cloud-5"
          style={{ transform: `translateX(${scrollY * -0.06}px)` }}
        ></div>
        <div
          className="cloud cloud-6"
          style={{ transform: `translateX(${scrollY * 0.03}px)` }}
        ></div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </div>
  );
}
