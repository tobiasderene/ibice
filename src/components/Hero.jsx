// Hero.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';
import ibicesImg from '../assets/ibices.jpg';

export default function Hero({ id }) {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const [showJuntos, setShowJuntos] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  // preload imagen
  useEffect(() => {
    const img = new Image();
    img.src = ibicesImg;
    img.onload = () => {
      console.log('✅ Imagen cargada'); // 👈 agrega esto
      setLoaded(true);
      setTimeout(() => {
        setVisible(true);
        console.log('✅ Visible activado'); // 👈 y esto
      }, 100);
    };
  }, []);

  // animación de texto
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowJuntos(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  // 👇 Detectar cuando el hero sale del viewport
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !backgroundRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.bottom > 0;
      
      if (isInView) {
        backgroundRef.current.classList.remove('hidden');
      } else {
        backgroundRef.current.classList.add('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar al inicio
    
    return () => window.removeEventListener('scroll', handleScroll);
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
        ref={backgroundRef}
        className={`hero-background ${visible ? 'visible' : ''}`}
        style={{
          backgroundImage: loaded ? `url(${ibicesImg})` : 'none',
        }}
      />
      
      <div className="hero-overlay" />
      
      <div className="hero-content">
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
