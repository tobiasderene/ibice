import React, { useState, useEffect, useRef } from 'react';
import '../styles/CTA.css';
import mountainImage from '../assets/mountain.jpg';
import PopupCTA from './PopupCTA'; // ← Importa aquí

export default function HeroCTA({ id }) {
  const sectionRef = useRef(null);
  const popupRef = useRef(null); // ← Crea la ref
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [parallax, setParallax] = useState(0);
  const mountainImg = mountainImage;

  // preload imagen
  useEffect(() => {
    const img = new Image();
    img.src = mountainImg;
    img.onload = () => setLoaded(true);
  }, [mountainImg]);

  // show content después de cargar
  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setShowContent(true), 450);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  // scroll -> parallax
  useEffect(() => {
    let ticking = false;
    const handle = () => {
      if (!sectionRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current.getBoundingClientRect();
          const windowH = window.innerHeight || document.documentElement.clientHeight;
          const sectionCenter = rect.top + rect.height / 2;
          const distanceFromCenter = sectionCenter - windowH / 2;
          const normalized = distanceFromCenter / windowH;
          const clamped = Math.max(-1, Math.min(1, normalized));
          const MAX_PX = windowH * 0.3;
          setParallax(-clamped * MAX_PX);
          ticking = false;
        });
        ticking = true;
      }
    };

    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  return (
    <>
      <div
        id={id}
        ref={sectionRef}
        className={`hero-cta-parallax ${loaded ? 'loaded' : ''}`}
      >
        {!loaded && (
          <div className="hero-cta-placeholder">
            <div className="spinner" />
          </div>
        )}

        <div
          className="hero-cta-background"
          style={{
            transform: `translateY(${parallax}px)`,
            backgroundImage: loaded ? `url(${mountainImg})` : 'none',
            opacity: loaded ? 1 : 0,
          }}
        />

        <div className="hero-cta-overlay" />

        <div className={`hero-cta-content ${showContent ? 'visible' : ''}`}>
          <div className={`hero-cta-text ${showContent ? 'visible' : ''}`}>
            <h2 className="hero-cta-title">¿Listo para alcanzar la cima?</h2>
            <p className="hero-cta-subtitle">
              Transformá tu negocio con soluciones tecnológicas que realmente funcionan.
            </p>
          </div>

          <div className={`hero-cta-buttons ${showContent ? 'visible' : ''}`}>
            <button 
              className="hero-cta-action-button primary"
              onClick={() => popupRef.current?.openPopup()} // ← Abre el popup
            >
              Hablemos
            </button>
          </div>

          <div className={`hero-cta-info ${showContent ? 'visible' : ''}`}>
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

      {/* ← Renderiza el popup */}
      <PopupCTA ref={popupRef} />
    </>
  );
}