import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center bg-rose-600 p-8 text-white md:flex-row">
    <div className="mx-auto max-w-xl md:order-1 md:flex-1">
      {/* Left Section */}
      <div className="md:ml-8">
        <h2 className="mb-4 text-5xl font-bold">what are you?</h2>
        <p className="mb-6 text-lg">
          a caterer, a dj, a makeup stylist, a photographer etc, then this is for you.
        </p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
          <button className="rounded-full bg-white px-4 py-2 text-rose-600">Get Started</button>
          <button className="rounded-full border border-white bg-transparent px-4 py-2 text-white">
            Learn More
          </button>
        </div>
      </div>
    </div>
    {/* Right Section */}
    <div className="mt-8 md:order-2 md:mt-0 md:flex-1">
      
      <Image src="/assets/images/wedding_hero_image.jpg" width={1080} height={720}  alt="Wedding Event"
        className="h-full w-full rounded-lg object-cover"></Image>
    </div>
  </section>
  )
}

export default HeroSection