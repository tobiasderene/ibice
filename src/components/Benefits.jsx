import React, { useEffect, useRef, useState } from 'react';
import { Zap, Shield, TrendingUp, Target } from 'lucide-react';
import '../styles/Benefits.css';

export default function BenefitsSection({ id }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const benefits = [
    {
      icon: Zap,
      title: "Tecnología sin complicaciones",
      description: "Nos ocupamos del lado técnico para que vos puedas enfocarte en crecer."
    },
    {
      icon: Shield,
      title: "Tu confianza es prioridad",
      description: "Cuidamos tus datos, procesos y resultados como si fueran nuestros."
    },
    {
      icon: TrendingUp,
      title: "Crecemos y te acompañamos",
      description: "Construimos soluciones y damos soporte que acompañan tu empresa."
    },
    {
      icon: Target,
      title: "Resultados claros y medibles",
      description: "Cada proyecto tiene impacto real y transparente para vos y tu equipo."
    }
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
                }, index * 120); // ← Delay escalonado
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
    <section className="benefits-section" id={id} ref={sectionRef}>
      <div className="benefits-container">
        {/* Encabezado */}
        <div className={`benefits-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="benefits-title">Por qué elegir Ibice Solutions</h2>
          <div className="benefits-accent-line"></div>
          <p className="benefits-subtitle">
            Tecnología clara, procesos seguros y acompañamiento real
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="benefits-grid">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                ref={el => (cardsRef.current[index] = el)} // ← Agregado ref
                className="benefit-card"
              >
                <div className="benefit-card-content">
                  <Icon className="benefit-icon" strokeWidth={1.5} />
                  <h3 className="benefit-card-title">{benefit.title}</h3>
                  <p className="benefit-card-description">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}