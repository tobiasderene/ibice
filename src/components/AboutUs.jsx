import { useEffect, useRef } from 'react';
import '../styles/AboutUs.css';

const AboutSection = () => {
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section className="about-section" id='aboutus'>
      <div className="about-container">
        {/* Header */}
        <div className="about-header" ref={headerRef}>
          <h2 className="about-title">Sobre Ibice Solutions</h2>
          <div className="about-accent-line"></div>
        </div>

        {/* Content Grid */}
        <div className="about-content" ref={contentRef}>
          {/* Columna de Texto */}
          <div className="about-text-column">
            <p className="about-paragraph">
              Ibice Solutions se especializa en desarrollo web, aplicaciones móviles 
              y soluciones de Business Intelligence para pequeñas y medianas empresas.
            </p>
            <p className="about-paragraph">
              Trabajamos con tecnologías modernas como React, Node.js, Python y frameworks 
              actuales, aplicando metodología ágil para garantizar entregas eficientes 
              y adaptadas a cada necesidad.
            </p>
            <p className="about-paragraph">
              Nos enfocamos en entender las necesidades reales de cada cliente para 
              entregar soluciones funcionales, escalables y con un enfoque práctico 
              que genere valor desde el primer día.
            </p>
          </div>

          {/* Columna de Valores */}
          <div className="about-values-column">
            <div className="about-value-item">
              <h3 className="about-value-title">
                <svg className="about-value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Agilidad
              </h3>
              <p className="about-value-description">
                Metodología ágil y entregas iterativas para resultados rápidos y adaptables.
              </p>
            </div>

            <div className="about-value-item">
              <h3 className="about-value-title">
                <svg className="about-value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Comunicación Directa
              </h3>
              <p className="about-value-description">
                Contacto directo sin intermediarios, priorizando claridad y transparencia.
              </p>
            </div>

            <div className="about-value-item">
              <h3 className="about-value-title">
                <svg className="about-value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Soluciones Reales
              </h3>
              <p className="about-value-description">
                Enfoque práctico en resolver problemas concretos con tecnología funcional.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Opcional */}
        {/* <div className="about-cta">
          <a href="#contact" className="about-cta-button">Hablemos de tu proyecto</a>
        </div> */}
      </div>
    </section>
  );
};

export default AboutSection;