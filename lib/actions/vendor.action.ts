"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { GetVendorByIdParams } from './shared.types';







export async function getAllVendors() {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { data: vendors } = await supabase
  .from('vendors')
  .select();

const { data: vendorImages } = await supabase
  .from('vendor_images')
  .select();

// Combine the data from both tables based on the vendor_id
const combinedData = vendors.map((vendor) => {
  const images = vendorImages.filter((image) => image.vendor_id === vendor.vendor_id);
  return { ...vendor, images };
});

 console.log(combinedData);

          return (combinedData);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function getVendorById(params: GetVendorByIdParams) {
    try {
     
      const supabase = createServerComponentClient ({cookies});
      const { vendorId } = params;
      
// Fetch data from the vendors table
const { data: vendorsData, error: vendorsError } = await supabase
.from('vendors')
.select('*')
.eq('vendor_id', vendorId);

if (vendorsError) {
console.error('Error fetching vendor data:', vendorsError.message);
} else {
const vendor = vendorsData[0]; // Assuming there is only one vendor with the given vendor_id

// Fetch data from the vendor_images table
const { data: imagesData, error: imagesError } = await supabase
  .from('vendor_images')
  .select('*')
  .eq('vendor_id', vendorId);

if (imagesError) {
  console.error('Error fetching images data:', imagesError.message);
} else {

  // Fetch data from the vendor_images table
const { data: reviewsData, error: reviewsError } = await supabase
.from('reviews')
.select('*')
.eq('vendor_id', vendorId);

if (reviewsError) {
  console.error('Error fetching reviews data:', reviewsError.message);
}
else {
  const combinedData = {
    ...vendor,
    images: imagesData,
    reviews:reviewsData,
  };

  console.log('Combined data for vendor with vendor_id 1:', combinedData);
  return  (combinedData);
}
}
       
    } 
  }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

 