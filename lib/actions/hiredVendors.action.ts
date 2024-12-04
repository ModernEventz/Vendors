//@ts-nocheck
"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { GetHiredVendorByIdParams, submitHiredVendorParams } from './shared.types';
 
export async function submitHiredVendor(params: submitHiredVendorParams ) {

  
  // eslint-disable-next-line no-useless-catch
  try {
     
      const supabase = createServerComponentClient ({cookies});
    
     
      
         
    
      const { vendor_id,vendor_name,location,price,rating,rating_count,description,image,profile_id,category} = params;

       
  // Update or insert the user's rating into the Supabase database
  const { data, error } = await supabase
    .from('hiredvendors')
    .insert([
      {vendor_id,vendor_name,location,price,rating,rating_count,description,image,profile_id,category }
    ]).select();

    
    
  if (error) {
    console.error('Error updating hiredvendors:', error.message);
  } else {
   console.log('sent');
  }



console.log(data);

        return (data);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHiredVendorById(params:GetHiredVendorByIdParams ) {
  try {
      const supabase = createServerComponentClient ({cookies});
      const { profile_Id } = params;
 
const { data:vendor, error } = await supabase
.from('hiredvendors')
.select('*')
.eq('profile_id', profile_Id)
.order('vendor_id', { ascending: true });
  
    return vendor;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
