import React, { useState, useEffect, useRef } from 'react';
import '../styles/AboutUs.css';

export default function SobreNosotros() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const servicios = [
    {
      icon: '🎯',
      titulo: 'Estrategia Digital',
      descripcion: 'Desarrollamos estrategias personalizadas que impulsan tu presencia online y maximizan tu ROI.'
    },
    {
      icon: '💻',
      titulo: 'Desarrollo Web',
      descripcion: 'Creamos sitios web y aplicaciones modernas, rápidas y optimizadas para todos los dispositivos.'
    },
    {
      icon: '📱',
      titulo: 'Apps Móviles',
      descripcion: 'Diseñamos y desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android.'
    },
    {
      icon: '🎨',
      titulo: 'Diseño UX/UI',
      descripcion: 'Experiencias de usuario intuitivas y diseños visuales que conectan con tu audiencia.'
    },
    {
      icon: '📊',
      titulo: 'Marketing Digital',
      descripcion: 'Campañas efectivas en redes sociales, SEO y publicidad digital para hacer crecer tu negocio.'
    },
    {
      icon: '🔧',
      titulo: 'Consultoría Tech',
      descripcion: 'Asesoramiento especializado en tecnología para optimizar tus procesos y sistemas.'
    }
  ];

  return (
    <section className="sobre-nosotros" id="sobre-nosotros" ref={sectionRef}>
      <div className="sobre-nosotros-container">
        <div className={`sobre-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="sobre-title">Sobre Nosotros</h2>
          <p className="sobre-subtitle">
            Somos un equipo apasionado de profesionales dedicados a transformar ideas en soluciones digitales innovadoras
          </p>
        </div>

        <div className={`sobre-content ${isVisible ? 'visible' : ''}`}>
          <div className="sobre-descripcion">
            <div className="descripcion-card">
              <h3>Nuestra Misión</h3>
              <p>
                Empoderar a empresas y emprendedores con tecnología de vanguardia, 
                brindando soluciones digitales que no solo cumplen expectativas, 
                sino que las superan. Creemos en el poder de la innovación para 
                transformar negocios y crear experiencias memorables.
              </p>
            </div>

            <div className="descripcion-stats">
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">Proyectos Completados</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Clientes Satisfechos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Años de Experiencia</span>
              </div>
            </div>
          </div>

          <div className="sobre-valores">
            <h3>Nuestros Valores</h3>
            <div className="valores-grid">
              <div className="valor-item">
                <span className="valor-icon">⚡</span>
                <h4>Innovación</h4>
                <p>Siempre buscando las mejores soluciones tecnológicas</p>
              </div>
              <div className="valor-item">
                <span className="valor-icon">🤝</span>
                <h4>Compromiso</h4>
                <p>Dedicados al éxito de cada proyecto</p>
              </div>
              <div className="valor-item">
                <span className="valor-icon">🌟</span>
                <h4>Excelencia</h4>
                <p>Calidad en cada línea de código</p>
              </div>
              <div className="valor-item">
                <span className="valor-icon">💡</span>
                <h4>Creatividad</h4>
                <p>Diseños únicos que destacan</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`servicios-grid ${isVisible ? 'visible' : ''}`}>
          <h3 className="servicios-title">Lo Que Hacemos</h3>
          <div className="servicios-container">
            {servicios.map((servicio, index) => (
              <div 
                key={index} 
                className="servicio-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="servicio-icon">{servicio.icon}</div>
                <h4 className="servicio-titulo">{servicio.titulo}</h4>
                <p className="servicio-descripcion">{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}