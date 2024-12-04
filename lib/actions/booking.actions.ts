//@ts-nocheck
"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { BookingParams } from './shared.types';





export async function BookVendor(params: BookingParams) {

  
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
       
    //    const user = await currentUser();

      
        const { vendorId,price,username,email,date,time,numberOfGuests,message,phoneNumber} = params;
  
    // Update or insert the user's rating into the Supabase database
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {vendor_id: vendorId,name:username,email,date,time,price,message,num_guests:numberOfGuests,phone_number:phoneNumber }
      ]).select();

     // revalidatePath(path)
      
    if (error) {
      console.error('Error sending message:', error.message);
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

 
