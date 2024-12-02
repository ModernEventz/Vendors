import React from 'react'
import Image from 'next/image'

const EventPlanningSection = () => {
  return (
    <section className="flex flex-col items-center bg-white p-8 text-black md:flex-row">
    <div className="mx-auto max-w-xl md:order-2 md:flex-1">
      {/* Left Section */}
      <div className="md:ml-8">
        <h2 className="mb-4 text-3xl font-bold">Simplify your wedding planning</h2>
        <p className="mb-6 text-lg text-slate-500">
        With Save TheDate, you can easily manage your checklist and budget. Our tools make it simple to stay organized and ensure that nothing is overlooked.
        </p>
       
      </div>
    </div>
    {/* Right Section */}
    <div className="mt-8 md:order-1 md:mt-0 md:flex-1">
      
      <Image src="/assets/images/wedding_planner.png " width={1080} height={720}  alt="Wedding Event"
        className="h-full w-full rounded-lg object-cover"></Image>
    </div>
  </section>
  )
}

export default EventPlanningSection