import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import Products from './components/Products';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

function App() {
  const [view, setView] = useState<'landing' | 'signin' | 'signup'>('landing');

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setView(mode);
  };

  if (view !== 'landing') {
    return (
      <AuthPage
        initialMode={view}
        onBackToHome={() => setView('landing')}
      />
    );
  }

  return (
    <CartProvider>
      <div className="bg-[#fdf9f2] text-primary-900 min-h-screen antialiased">
        <Navbar onOpenAuth={handleOpenAuth} />
        <main>
          <Hero />
          <Features />
          <Products />
          <About />
          <Stats />
          <Testimonials />
          <Pricing />
          <CTA />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
