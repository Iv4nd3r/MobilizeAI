// src/components/FeaturesSection.js
import React from 'react'
import NavigationIcon from '/src/assets/navigation-icon.svg'
import DashboardIcon from '/src/assets/dashboard-icon.svg'
import AITipsIcon from '/src/assets/ai-icon.svg'
import EnergyHistoryIcon from '/src/assets/energyhistory-icon.svg'

const FeatureCard = ({ title, description, icon }) => (
  <div
    className="p-8 rounded-xl shadow-lg flex items-start"
    style={{
      background:
        'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
      backdropFilter: 'blur(20px)',
      borderRadius: '25px',
      width: '100%',
      maxWidth: '700px'
    }}
  >
    <div className="flex flex-col items-center mr-6 min-w-[150px]">
      <img src={icon} alt={`${title} icon`} className="w-24 h-24 mb-2" />
      <h5 className="text-xl font-bold text-[#d4d0af] whitespace-nowrap">
        {title}
      </h5>
    </div>
    <p
      className="text-[30px] font-extrabold text-[#DBE5F6] leading-tight"
      style={{ maxWidth: '362px' }}
    >
      {description}
    </p>
  </div>
)

const FeaturesSection = () => {
  return (
    <section className="text-center py-24 bg-[#17202A] text-white">
      <h3
        className="text-[80px] font-black mb-16 inline-block"
        style={{
          background: 'linear-gradient(90deg, #D4D0AF 27%, #EBEDEF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Our key features
      </h3>
      <div className="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
        <FeatureCard
          title="Navigation"
          description="Plan routes efficiently with real-time navigation."
          icon={NavigationIcon}
        />
        <FeatureCard
          title="Dashboard"
          description="Monitor real-time weather conditions to optimize decisions."
          icon={DashboardIcon}
        />
        <FeatureCard
          title="AI-driven Tips"
          description="Get personalized energy-saving recommendations."
          icon={AITipsIcon}
        />
        <FeatureCard
          title="Energy History"
          description="Track and analyze your daily energy consumption."
          icon={EnergyHistoryIcon}
        />
      </div>
    </section>
  )
}

export default FeaturesSection
