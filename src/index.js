import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// --- Ajuste de vh para iOS / Safari móvil ---
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Ejecutar al cargar
setVh();

// Ejecutar al redimensionar (cuando Safari muestra/oculta barra)
window.addEventListener('resize', setVh);

// --- Render ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
