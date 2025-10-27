import React, { useState, useEffect, useRef } from 'react';
import '../styles/CTA.css';
import mountainImage from '../assets/mountain.jpg';
import PopupCTA from './PopupCTA';

export default function HeroCTA({ id }) {
  const sectionRef = useRef(null);
  const popupRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mountainImg = mountainImage;

  // Preload de imagen
  useEffect(() => {
    const img = new Image();
    img.src = mountainImg;
    img.onload = () => setLoaded(true);
  }, [mountainImg]);

  // Detectar visibilidad
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
    handleScroll(); // ejecuta una vez al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        id={id}
        ref={sectionRef}
        className={`hero-cta-parallax ${loaded ? 'loaded' : ''}`}
      >
        {/* Placeholder mientras carga */}
        {!loaded && (
          <div className="hero-cta-placeholder">
            <div className="spinner" />
          </div>
        )}

        {/* Fondo */}
        <div
          className={`hero-cta-background ${isVisible ? 'visible' : ''}`}
          style={{
            backgroundImage: loaded ? `url(${mountainImg})` : 'none',
            opacity: loaded && isVisible ? 1 : 0,
          }}
        />

        {/* Overlay */}
        <div className="hero-cta-overlay" />

        {/* Contenido */}
        <div className="hero-cta-content">
          <div className="hero-cta-text">
            <h2 className="hero-cta-title">¿Listo para alcanzar la cima?</h2>
            <p className="hero-cta-subtitle">
              Transformá tu negocio con soluciones tecnológicas que realmente funcionan.
            </p>
          </div>

          <div className="hero-cta-buttons">
            <button
              className="hero-cta-action-button primary"
              onClick={() => popupRef.current?.openPopup()}
            >
              Hablemos
            </button>
          </div>

          <div className="hero-cta-info">
            <div className="hero-info-item">
              <span className="hero-info-number">+5</span>
              <span className="hero-info-label">Trabajos realizados</span>
            </div>
            <div className="hero-info-item">
              <span className="hero-info-number">100%</span>
              <span className="hero-info-label">Satisfacción</span>
            </div>
            <div className="hero-info-item">
              <span className="hero-info-number">24/7</span>
              <span className="hero-info-label">Soporte</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      <PopupCTA ref={popupRef} />
    </>
  );
}
