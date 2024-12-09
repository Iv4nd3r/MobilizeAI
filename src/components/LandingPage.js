import React from 'react';
import Header from './Header';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import CallToAction from './CallToAction';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="bg-[#17202A] text-white w-full min-h-screen">
      <Header />
      <WelcomeSection />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
