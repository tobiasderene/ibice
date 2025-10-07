import React, { useEffect, useRef } from 'react';
import '../styles/Products.css';

export default function ProductsSection() {
  const products = [
    {
      id: 1,
      title: "Software Factory",
      description: "Desarrollos ágiles, mantenibles y escalables, sin dolores de cabeza.",
      imagePosition: "left",
      imagePlaceholder: "software-mockup.png",
      bgColor: "white"
    },
    {
      id: 2,
      title: "Data",
      description: "Transformamos tus datos en decisiones claras y accionables.",
      imagePosition: "right",
      imagePlaceholder: "data-dashboard.png",
      bgColor: "gray"
    },
    {
      id: 3,
      title: "Web Development",
      description: "Sitios web rápidos, confiables y diseñados para crecer con tu empresa.",
      imagePosition: "left",
      imagePlaceholder: "web-mockup.png",
      bgColor: "white"
    }
  ];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    products.forEach((_, index) => {
      const ref = sectionRefs.current[index];
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('content-visible');
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px' }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="products-section">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className={`product-row ${product.bgColor === 'gray' ? 'product-row-gray' : 'product-row-white'}`}
        >
          <div className="product-container">
            <div 
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`product-content ${product.imagePosition === 'right' ? 'product-content-reverse' : ''}`}
            >
              
              {/* Imagen */}
              <div 
                className={`product-image-wrapper ${product.imagePosition === 'left' ? 'slide-from-left' : 'slide-from-right'}`}
              >
                <div className="product-image-placeholder">
                  <div className="product-image-text">
                    {product.imagePlaceholder}
                  </div>
                </div>
              </div>

              {/* Texto */}
              <div className="product-text-wrapper">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>
                <button className="product-cta">
                  Ver más
                  <svg 
                    className="product-cta-icon" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </section>
  );
}