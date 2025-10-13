import React, { useState, forwardRef, useImperativeHandle } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/PopupCTA.css';

emailjs.init('PWd9Ths_yAf-p0M2O');

const PopupCTA = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const products = [
    'Software Factory',
    'Business Intelligence',
    'Web Development',
    'Mobile Apps'
  ];

  // === Abrir el popup sin mover la página ===
  const openPopup = () => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'hidden';
    setIsOpen(true);
  };

  // === Cerrar el popup y restaurar scroll ===
  const handleClosePopup = () => {
    console.log('EJECUTANDO handleClosePopup()');
    const top = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.overflowY = '';
    document.body.style.width = '';
    setIsOpen(false);

    // restaurar scroll
    const parsed = parseInt(top || '0', 10);
    if (!Number.isNaN(parsed)) {
      window.scrollTo(0, -parsed);
    }

    setFormData({ name: '', email: '', phone: '', product: '' });
    setSubmitMessage('');
  };

  // Exponer método al componente padre
  useImperativeHandle(ref, () => ({
    openPopup
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.product) {
      setSubmitMessage('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await emailjs.send(
        'service_7p2qpes',
        'template_getcxrt',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          product: formData.product,
          time: new Date().toLocaleString('es-ES'),
          message: `Nuevo contacto: ${formData.name} interesado en ${formData.product}`
        }
      );

      if (response.status === 200) {
        setSubmitMessage('¡Gracias! Pronto nos pondremos en contacto.');
        setTimeout(() => {
          handleClosePopup();
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Error al enviar. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="popup-cta-overlay" onClick={handleClosePopup}>
          <div
            className="popup-cta-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="popup-cta-close"
              onClick={(e) => {
                e.stopPropagation();
                console.log('CLICK EN X - disparando handleClosePopup()');
                handleClosePopup();
              }}
              aria-label="Cerrar popup"
            >
              ✕
            </button>

            <div className="popup-cta-content">
              <h2 className="popup-cta-title">Cuéntanos sobre ti</h2>
              <p className="popup-cta-subtitle">
                Completa el formulario y nos pondremos en contacto pronto
              </p>

              <form onSubmit={handleSubmit} className="popup-cta-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+xx xxx xxx xxxx"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product" className="form-label">
                    Producto de interés *
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="form-input form-select"
                    disabled={isSubmitting}
                  >
                    <option value="">Selecciona un producto</option>
                    {products.map((prod, idx) => (
                      <option key={idx} value={prod}>
                        {prod}
                      </option>
                    ))}
                  </select>
                </div>

                {submitMessage && (
                  <div
                    className={`submit-message ${
                      submitMessage.includes('Gracias') ? 'success' : 'error'
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

PopupCTA.displayName = 'PopupCTA';
export default PopupCTA;
