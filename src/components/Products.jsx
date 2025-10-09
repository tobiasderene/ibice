import React, { useState, useEffect, useRef } from 'react';
import '../styles/Products.css';

export default function ServicesSection({ id }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    { id: 1, title: "Software Factory", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&q=80" },
    { id: 2, title: "Business Intelligence", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
    { id: 3, title: "Web Development", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80" },
    { id: 4, title: "Mobile Apps", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.classList.add('card-visible');
                }, index * 120);
              }
            });
          } else {
            cardsRef.current.forEach(card => card && card.classList.remove('card-visible'));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      id={id}
    >
      <div className="services-container">
        <div className={`services-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="services-title">Nuestros Servicios</h2>
          <div className="services-accent-line"></div>
          <p className="services-subtitle">
            Soluciones tecnológicas diseñadas para impulsar tu negocio
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => (cardsRef.current[index] = el)}
              className="service-card"
            >
              <div className="service-image-wrapper">
                <img src={service.image} alt={service.title} className="service-image" />
              </div>

              <div className="service-overlay" />
              <h3 className="service-title">{service.title}</h3>
              <div className="decorative-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
