import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Products from './components/Products';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <>
      <Header />
      <Hero id="inicio" />
      <Products id="productos" />
      <Benefits id="benefits" />
    </>
  );
}

export default App;
