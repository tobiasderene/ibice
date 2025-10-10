import React, { useState, useEffect, useRef } from 'react';
import '../styles/CTA.css';
import mountainImage from '../assets/mountain.jpg';

export default function CTAParallax({ id }) {
  const sectionRef = useRef(null);
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

  // scroll -> parallax (requestAnimationFrame para smooth/performance)
  useEffect(() => {
    let ticking = false;
    const handle = () => {
      if (!sectionRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current.getBoundingClientRect();
          const windowH = window.innerHeight || document.documentElement.clientHeight;
          // centro de la sección respecto al centro del viewport
          const sectionCenter = rect.top + rect.height / 2;
          const distanceFromCenter = sectionCenter - windowH / 2; // +/- px
          const normalized = distanceFromCenter / windowH; // aprox -1 .. 1
          const clamped = Math.max(-1, Math.min(1, normalized));
          const MAX_PX = windowH * 0.3; // 10% de la altura visible
          // movemos el background en sentido OPUESTO para que no "desaparezca"
          setParallax(-clamped * MAX_PX);
          ticking = false;
        });
        ticking = true;
      }
    };

    handle(); // init
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`cta-parallax ${loaded ? 'loaded' : ''}`}
    >
      {!loaded && (
        <div className="cta-placeholder">
          <div className="spinner" />
        </div>
      )}

      <div
        className="cta-background"
        style={{
          transform: `translateY(${parallax}px)`,
          backgroundImage: loaded ? `url(${mountainImg})` : 'none',
          opacity: loaded ? 1 : 0,
          transition: 'transform 0.2s ease-out',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
        }}
      />

      <div className="cta-overlay" />

      <div
        className="cta-content"
        // mantén aquí solo transforms muy suaves si querés; yo lo dejo estático para evitar desajustes
        style={{ transform: `translateY(0px)` }}
      >
        <div className={`cta-text ${showContent ? 'visible' : ''}`}>
          <h2 className="cta-title">¿Listo para alcanzar la cima?</h2>
          <p className="cta-subtitle">
            Transformá tu negocio con soluciones tecnológicas que realmente funcionan.
          </p>
        </div>

        <div className={`cta-buttons ${showContent ? 'visible' : ''}`}>
          <button className="cta-action-button primary">Comenzar ahora</button>
        </div>

        <div className={`cta-info ${showContent ? 'visible' : ''}`}>
          <div className="info-item">
            <span className="info-number">+5</span>
            <span className="info-label">Proyectos completados</span>
          </div>
          <div className="info-item">
            <span className="info-number">100%</span>
            <span className="info-label">Clientes satisfechos</span>
          </div>
          <div className="info-item">
            <span className="info-number">24/7</span>
            <span className="info-label">Soporte disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
