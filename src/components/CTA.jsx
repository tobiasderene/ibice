import React, { useState, useEffect, useRef } from 'react';
import '../styles/CTA.css';
import mountainImage from '../assets/mountain.jpg';
import PopupCTA from './PopupCTA';

export default function HeroCTA({ id }) {
  const sectionRef = useRef(null);
  const popupRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [parallax, setParallax] = useState(0);
  const mountainImg = mountainImage;

  // Detecta si es mobile
  const isMobile = window.innerWidth <= 768;

  // --- Preload imagen ---
  useEffect(() => {
    const img = new Image();
    img.src = mountainImg;
    img.onload = () => setLoaded(true);
  }, [mountainImg]);

  // --- Mostrar contenido después de cargar ---
  useEffect(() => {
    if (loaded) {
      if (isMobile) {
        setShowContent(true);
        return;
      }
      const t = setTimeout(() => setShowContent(true), 450);
      return () => clearTimeout(t);
    }
  }, [loaded, isMobile]);

  // --- Parallax scroll (solo desktop) ---
  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  // --- Reveal effect al entrar en pantalla ---
  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.7; // Cuando entra el 30%

      if (rect.top < triggerPoint) {
        sectionRef.current.classList.add('hero-cta-active');
      } else {
        sectionRef.current.classList.remove('hero-cta-active');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar una vez al montar
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

        {/* Fondo parallax */}
        <div
          className="hero-cta-background"
          style={{
            transform: isMobile ? 'none' : `translateY(${parallax}px)`,
            backgroundImage: loaded ? `url(${mountainImg})` : 'none',
            opacity: loaded ? 1 : 0,
          }}
        />

        {/* Overlay oscuro */}
        <div className="hero-cta-overlay" />

        {/* Contenido */}
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
              onClick={() => popupRef.current?.openPopup()}
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

      {/* Popup */}
      <PopupCTA ref={popupRef} />
    </>
  );
}
