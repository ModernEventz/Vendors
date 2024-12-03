//@ts-nocheck
import React from 'react'

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8 ">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-rose-600 p-4 shadow-dark-100" >
          <h3 className="text-xl text-white font-semibold mb-2">Vendor Discovery</h3>
          <p className='text-white'>Explore a wide range of event vendors for your special day.</p>
        </div>
        <div className="p-4  bg-rose-600 shadow-dark-100">
          <h3 className="text-xl text-white font-semibold mb-2">Planning Tools</h3>
          <p className='text-white'>Use our checklist and budget tools to plan your event seamlessly.</p>
        </div>
        <div className="p-4  bg-rose-600 shadow-dark-100">
          <h3 className="text-xl text-white font-semibold mb-2">Shop Accessories</h3>
          <p className='text-white'>Find the perfect accessories for your wedding in our online shop.</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default FeaturesSection
