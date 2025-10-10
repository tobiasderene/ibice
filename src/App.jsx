import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import CTA from './components/CTA';
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Hero id="inicio" />
      <Products id="productos" />
      <Benefits id="benefits" />
      <AboutUs id="aboutus" />
      <CTA id="cta" />
    </>
  );
}

export default App;
