import React from 'react'
import LaptopIllustration from '/src/assets/illustration-1.svg'

const CallToAction = () => {
  return (
    <section className="relative text-center py-20 bg-[#17202A] text-white">
      <div className="flex justify-center mb-10">
        <img
          src={LaptopIllustration}
          alt="Laptop Illustration"
          className="w-[600px] h-auto z-10"
        />
      </div>

      <h4 className="text-[100px] font-black text-[#d4d0af]">
        Efficient. Smart. Sustainable.
      </h4>
    </section>
  )
}

export default CallToAction
