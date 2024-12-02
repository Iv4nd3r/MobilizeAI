// src/components/WelcomeSection.js
import React from 'react'
import CarImage from '/src/assets/car-illustration.svg'
import Logo from '/src/assets/mobilizeai-logo.svg' // Import the logo

const WelcomeSection = () => {
  return (
    <section className="bg-customDark text-white py-60 relative">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-screen-lg mx-auto px-4">
        {/* Text Section */}
        <div className="lg:w-3/5 text-center lg:text-left mb-10 lg:mb-0 lg:pr-10 relative z-10">
          {' '}
          {/* Adjusted width */}
          <h1
            className="text-[60px] lg:text-[100px] font-black leading-none font-montserrat inline-block mr-4 whitespace-nowrap" // Added whitespace-nowrap
            style={{
              background: 'linear-gradient(135deg, #D4D0AF 27%, #EBEDEF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome to
          </h1>
          {/* Replace "MobilizeAI" text with Logo */}
          <img
            src={Logo}
            alt="MobilizeAI Logo"
            className="w-[200px] lg:w-[800px] inline-block align-middle"
          />{' '}
          {/* Adjust width as needed */}
          <div className="flex items-start mt-4">
            {/* Description Box */}
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'rgba(214, 210, 180, 0.23)' }} // Custom color with opacity
            >
              <p className="text-[18px] lg:text-[22px] font-extrabold text-offWhite font-nunito">
                MobilizeAI empowers businesses to cut emissions with real-time
                weather insights, AI-driven energy-saving tips, and smart
                tracking for sustainable, efficient operations.
              </p>
            </div>
            {/* Rectangle on the Right Side */}
            <div
              style={{
                backgroundColor: '#D4D0AF',
                width: '30px', // Increased width
                height: '180px', // Same height as the description box
                borderRadius: '25px',
                marginLeft: '12px' // Adds space between the description box and rectangle
              }}
            ></div>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
          <img
            src={CarImage}
            alt="Car illustration"
            className="w-[350px] lg:w-[500px] h-auto absolute top-0 lg:top-[30%] right-0 transform translate-y-[-50%]"
          />
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
