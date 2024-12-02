import React from 'react'

import Image from 'next/image'


const VendorSection = () => {
  return (
    <section className="flex flex-col items-center bg-white p-8 text-black md:flex-row">
    <div className="mx-auto max-w-xl md:order-2 md:flex-1">
      {/* Left Section */}
      <div className="md:ml-8">
        <h2 className="mb-4 text-3xl font-bold">Discover top wedding vendors</h2>
        <p className="mb-6 text-lg text-slate-500">
        Save TheDate helps you find the best vendors for your wedding. From photographers to florists, we have a curated selection of professionals to make your special day perfect.
        </p>
       
      </div>
    </div>
    {/* Right Section */}
    <div className="mt-8 md:order-1 md:mt-0 md:flex-1">
      
      <Image src="/assets/images/wedding_vendors.jpg" width={1080} height={720}  alt="Wedding Event"
        className="h-full w-full rounded-lg object-cover"></Image>
    </div>
  </section>
  )
}

export default VendorSection