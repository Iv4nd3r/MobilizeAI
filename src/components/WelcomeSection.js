import React from 'react'
import CarImage from '/src/assets/car-illustration.svg'
import Logo from '/src/assets/mobilizeai-logo.svg'

const WelcomeSection = () => {
  return (
    <section className="bg-customDark text-white py-60 relative">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-screen-lg mx-auto px-4">
        <div className="lg:w-3/5 text-center lg:text-left mb-10 lg:mb-0 lg:pr-10 relative z-10">
          {' '}
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
          <img
            src={Logo}
            alt="MobilizeAI Logo"
            className="w-[200px] lg:w-[800px] inline-block align-middle"
          />{' '}
          <div className="flex items-start mt-4">
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: 'rgba(214, 210, 180, 0.23)' }}
            >
              <p className="text-[18px] lg:text-[22px] font-extrabold text-offWhite font-nunito">
                MobilizeAI empowers businesses to cut emissions with real-time
                weather insights, AI-driven energy-saving tips, and smart
                tracking for sustainable, efficient operations.
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#D4D0AF',
                width: '30px',
                height: '180px',
                borderRadius: '25px',
                marginLeft: '12px'
              }}
            ></div>
          </div>
        </div>

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
