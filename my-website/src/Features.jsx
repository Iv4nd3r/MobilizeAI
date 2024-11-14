import React from 'react';

function Features() {
  const features = [
    { title: "Navigation", description: "Plan routes efficiently with real-time navigation.", icon: "🚗" },
    { title: "Dashboard", description: "Monitor real-time weather conditions to optimize decisions.", icon: "📊" },
    { title: "AI-driven Tips", description: "Get personalized energy-saving recommendations.", icon: "💡" },
    { title: "Energy History", description: "Track and analyze your daily energy consumption.", icon: "📈" },
  ];

  return (
    <section className="text-center py-16 bg-darkBlue text-white">
      <h2 className="text-3xl font-bold mb-10">Our key features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-md">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-sm mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
