//@ts-nocheck
"use server"
import { currentUser } from '@clerk/nextjs';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { GetFilterVendorsByLocationParams, GetSearchVendorsPaginationParams, GetVendorByIdParams, GetVendorsByCategoryNoPaginationParams, GetVendorsByCategoryPaginationParams,insertVendorsParams, updateVendorsParams} from './shared.types';




function truncateText(input) {
  const text = String(input); // Convert input to string
  const halfLength = Math.floor(text.length / 2);
  return text.substring(0, halfLength);
}


export async function getVendorsByCategory(params:  GetVendorsByCategoryPaginationParams) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { Page,category } = params;
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('category', `%${category}%`)
  .range((Page - 1) * 10, Page * 10 - 1)
 
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


  export async function getSearchVendors(params: GetSearchVendorsPaginationParams) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { Page,searchTerm } = params;
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('vendor_name', `%${searchTerm}%`)
  .range((Page - 1) * 10, Page * 10 - 1)
 
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

  export async function getVendorsByCategoryNoPagination(params: GetVendorsByCategoryNoPaginationParams ) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
        const { category } = params;
       
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('category', `%${category}%`)
  .range(0,5)
 
 
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

  
  export async function getFilterByVendorsLocation(params: GetFilterVendorsByLocationParams ) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { Page,location,category } = params;
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('category', `%${category}%`)
  .ilike('location', `%${location}%`)
  .range((Page - 1) * 10, Page * 10 - 1)
 
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

  export async function getVendorById() {
    try {
     
      const supabase = createServerComponentClient ({cookies});


      
      const user =  await currentUser();
      const vendorId = user?.id
// Fetch data from the vendors table
const { data: vendorsData, error: vendorsError } = await supabase
.from('vendors')
.select('*')
.eq('profile_id', vendorId);

if (vendorsError) {
console.error('Error fetching vendor data:', vendorsError.message);
} else {
 const vendor = vendorsData; // Assuming there is only one vendor with the given vendor_id

 console.log('Combined data for vendor with vendor_id 1:', vendor);

  return  (vendor);

// Fetch data from the vendor_images table


}
    
}
    catch (error) {
      console.log(error);
      throw error;
    }
  }
 

  export async function getVendorDetailsById (params: GetVendorByIdParams) {
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
 const vendor = vendorsData; // Assuming there is only one vendor with the given vendor_id

 console.log('Combined data for vendor with vendor_id 1:', vendor);

  return  (vendor);

// Fetch data from the vendor_images table


}
    
}
    catch (error) {
      console.log(error);
      throw error;
    }
  }
 
  // Get profile info

  export async function getProfileInfo() {
    try {
     
      const supabase = createServerComponentClient ({cookies});


      
      const user =  await currentUser();
      const profileId = user?.id
// Fetch data from the vendors table
const { data: profileData, error: profileError } = await supabase
.from('profiles')
.select('*')
.eq('profile_id', profileId);

if (profileError) {
console.error('Error fetching profile data:', profileError.message);
} else {
 const profile = profileData; // Assuming there is only one vendor with the given vendor_id

 console.log('Combined data for vendor with vendor_id 1:', profile);

  return  (profile);

// Fetch data from the vendor_images table


}
    
}
    catch (error) {
      console.log(error);
      throw error;
    }
  }
 
  // Insert data in vendors table
  export async function insertVendors(params:  insertVendorsParams) {
    // eslint-disable-next-line no-useless-catch
    try {
       
      const supabase = createServerComponentClient ({cookies});
    
     
      const user = await currentUser();
         
    
      const { title,location,price,description,category,publicUrls } = params;

       
  // Update or insert the user's rating into the Supabase database

  const { data, error } = await supabase
  .from('vendors')
  .insert([
    { vendor_name:title,location,price,description,category,profile_id:user?.id,images:publicUrls }
  ]).select();

 // revalidatePath(path)
  
if (error) {
  console.error('Error inserting vendor:', error.message);
} else {
 console.log('sent',publicUrls);
 return (data);
}


  }
  
 catch (error) {
  console.log(error);
  throw error;
}

  }


   // Insert data in vendors table
   export async function updateVendors(params:  updateVendorsParams) {
    // eslint-disable-next-line no-useless-catch
    try {
       
      const supabase = createServerComponentClient ({cookies});
    
     
      const user = await currentUser();
         
    
      const {  vendorId,title,location,price,description,category,publicUrls } = params;

       
  // Update or insert the user's rating into the Supabase database

  const { data, error } = await supabase
  .from('vendors')
  .update([
    { vendor_name:title,location,price,description,category,profile_id:user?.id,images:publicUrls }
  ])
  .eq('vendor_id', vendorId)
  .select();

 // revalidatePath(path)
  
if (error) {
  console.error('Error inserting vendor:', error.message);
} else {
 console.log('sent',publicUrls);
 return (data);
}


  }
  
 catch (error) {
  console.log(error);
  throw error;
}

  }
