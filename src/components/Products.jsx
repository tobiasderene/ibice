import React, { useState, useEffect, useRef } from 'react';
import '../styles/Products.css';

export default function ServicesSection() {
  const [openService, setOpenService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const contentRefs = useRef([]);

  const services = [
    {
      id: 1,
      title: "Software Factory",
      shortDesc: "Desarrollos ágiles, mantenibles y escalables",
      fullDesc: "Creamos soluciones de software personalizadas que se adaptan perfectamente a las necesidades de tu negocio. Nuestro equipo trabaja con metodologías ágiles para garantizar entregas rápidas y de alta calidad. Desde aplicaciones web hasta sistemas complejos, nos enfocamos en código limpio, arquitecturas escalables y mantenimiento a largo plazo.",
      features: ["Desarrollo ágil", "Código escalable", "Mantenimiento continuo"],
      image: "/images/software-factory.jpg"
    },
    {
      id: 2,
      title: "Business Intelligence",
      shortDesc: "Transformamos tus datos en decisiones claras",
      fullDesc: "Convertimos el caos de datos en información estratégica que impulsa el crecimiento de tu empresa. Implementamos pipelines de datos robustos, creamos dashboards interactivos y aplicamos análisis avanzados para que puedas tomar decisiones basadas en evidencia real.",
      features: ["Análisis avanzado", "Dashboards interactivos", "Data pipelines"],
      image: "/images/business-intelligence.jpg"
    },
    {
      id: 3,
      title: "Web Development",
      shortDesc: "Sitios web rápidos y confiables",
      fullDesc: "Diseñamos y desarrollamos experiencias web modernas que cautivan a tus usuarios y convierten visitantes en clientes. Sitios de alto rendimiento, optimizados para SEO y completamente responsivos.",
      features: ["Performance optimizado", "SEO friendly", "Diseño responsivo"],
      image: "/images/web-development.jpg"
    }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setIsVisible(true)),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Espera medio segundo si ya hay uno abierto
  const handleServiceInteraction = (id) => {
    if (openService === id) {
      setOpenService(null);
      return;
    }
    if (openService !== null) {
      setOpenService(null);
      setTimeout(() => setOpenService(id), 500);
    } else {
      setOpenService(id);
    }
  };

  // Control dinámico de altura
  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (!ref) return;
      if (openService === services[index].id) {
        const fullHeight = ref.scrollHeight;
        ref.style.height = `${fullHeight}px`;
        ref.style.opacity = 1;
      } else {
        ref.style.height = "0px";
        ref.style.opacity = 0;
      }
    });
  }, [openService]);

  return (
    <section ref={sectionRef} className="services-section">
      <div className="services-container">
        <div className={`services-header ${isVisible ? 'visible' : ''}`}>
          <h2>Nuestros Servicios</h2>
          <p>Soluciones tecnológicas diseñadas para impulsar tu negocio</p>
        </div>

        <div className={`services-grid ${isMobile ? 'mobile' : 'desktop'}`}>
          {services.map((service, index) => {
            const isOpen = openService === service.id;
            return (
              <div
                key={service.id}
                className={`service-card ${isOpen ? 'open' : ''} ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => !isMobile && handleServiceInteraction(service.id)}
                onMouseLeave={() => !isMobile && setOpenService(null)}
                onClick={() => isMobile && handleServiceInteraction(service.id)}
              >
                <div className="service-header">
                  <div className="service-text">
                    <h3 className={isOpen ? 'open' : ''}>{service.title}</h3>
                    <p>{service.shortDesc}</p>
                  </div>
                  {isMobile && (
                    <div className={`service-toggle-icon ${isOpen ? 'open' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Contenido expandible */}
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="service-content"
                  style={{
                    height: '0px',
                    overflow: 'hidden',
                    opacity: 0,
                    transition: 'height 0.5s ease, opacity 0.5s ease',
                  }}
                >
                  <div className="service-content-inner">
                    <div className="service-details">
                      <p>{service.fullDesc}</p>
                      <div className="service-features">
                        {service.features.map((feat, idx) => (
                          <span key={idx} className="feature-badge">{feat}</span>
                        ))}
                      </div>
                    </div>
                    <div className={`service-image-wrapper ${isOpen ? 'visible' : ''}`}>
                      <img src={service.image} alt={service.title} className="service-image" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
