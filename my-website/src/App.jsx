import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Features from './Features';
import Footer from './Footer';

function App() {
  return (
    <div className="bg-darkBlue min-h-screen">
      <Header />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}

export default App;

