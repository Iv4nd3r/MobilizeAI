import React from 'react';

function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center bg-darkBlue py-16">
      <h1 className="text-5xl font-bold text-lightYellow">Welcome to <span className="text-lightBlue italic">MobilizeAI</span></h1>
      <p className="text-lg text-white mt-4 max-w-lg">
        MobilizeAI empowers businesses to cut emissions with real-time weather insights, AI-driven energy-saving tips, and smart tracking for sustainable, efficient operations.
      </p>
    </section>
  );
}

export default HeroSection;
