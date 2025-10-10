import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import '../styles/AboutUs.css'

const AboutAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Nosotros",
      content: (
        <>
          <p>
            <strong>Ibice Solutions</strong> nace con la misión de ayudar a las
            pequeñas y medianas empresas a romper la barrera digital.
            Creemos que dar el salto a lo digital no debería ser complicado ni
            inalcanzable, por eso ofrecemos soluciones que se adaptan al ritmo
            y las necesidades de cada negocio.
          </p>
          <p>
            Acompañamos a las empresas en cada etapa de su transformación,
            desde los primeros pasos hasta la implementación de sistemas más
            avanzados, combinando desarrollo web, automatización y análisis de
            datos.
          </p>
          <p>
            Nuestro enfoque es simple: <strong>hacer que la tecnología trabaje para vos, no al revés.</strong>
          </p>
        </>
      )
    },
    {
      title: "Valores",
      content: (
        <ul>
          <li><strong>Escuchar:</strong> entender realmente las necesidades del cliente.</li>
          <li><strong>Innovar:</strong> aplicar ideas nuevas que generen impacto.</li>
          <li><strong>Medir:</strong> evaluar resultados para mejorar continuamente.</li>
          <li><strong>Mejorar:</strong> evolucionar con cada proyecto.</li>
        </ul>
      )
    },
    {
      title: "Métodos",
      content: (
        <p>
          Aplicamos una metodología ágil centrada en la colaboración, la
          transparencia y la mejora continua. Cada etapa del proceso busca
          entregar valor real, permitiendo ajustes rápidos y soluciones
          efectivas.
        </p>
      )
    }
  ];

  return (
    <section id ="aboutus" className="about-section">
      <div className="about-container">
        <div className={`about-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="about-title">Sobre Nosotros</h2>
          <div className="about-accent-line"></div>
        </div>

        <div className="about-accordion">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`accordion-item ${isVisible ? 'card-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <h3>{item.title}</h3>
                <ChevronDown 
                  className={`chevron ${openIndex === index ? 'rotate' : ''}`}
                  size={24}
                />
              </button>
              <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutAccordion;