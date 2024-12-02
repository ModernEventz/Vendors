import React from 'react'

const SimilarVendorCard = ({vendor}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
    <img src={vendor.image_path} alt={vendor.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
    <h2 className="text-lg font-semibold mb-2">{vendor.title}</h2>
   
  </div>
  )
}

export default SimilarVendorCard