//@ts-nocheck
import React from 'react'
import Image from 'next/image'

const ShopSection = () => {
  return (
<section className="flex flex-col items-center bg-white p-8 text-black md:flex-row">
    <div className="mx-auto max-w-xl md:order-1 md:flex-1">
      {/* Left Section */}
      <div className="md:ml-8">
        <h2 className="mb-4 text-3xl font-bold">Shop for wedding accessories</h2>
        <p className="mb-6 text-lg text-slate-500">
        Explore our shop and find the perfect accessories for your wedding. From bridal jewelry to decor items, Save TheDate has everything you need to complete your vision.
        </p>
       
      </div>
    </div>
    {/* Right Section */}
    <div className="mt-8 md:order-2 md:mt-0 md:flex-1">
      
      <Image src="/assets/images/wedding_shop.webp" width={1080} height={720}  alt="Wedding Event"
        className="h-full w-full rounded-lg object-cover"></Image>
    </div>
  </section>
  )
}

export default ShopSection
