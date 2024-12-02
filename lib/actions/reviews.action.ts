"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { SubmitReviewParams } from './shared.types';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from "next/cache";


export async function submitReview(params: SubmitReviewParams) {

  
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
       
        const user = await currentUser();

      
        const { vendorId,message,rating,path } = params;
  
    // Update or insert the user's rating into the Supabase database
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        { vendor_id: vendorId, rating,comments:message,reviewer_name:user?.firstName,avatar:user?.imageUrl }
      ]).select();

      revalidatePath(path)
      
    if (error) {
      console.error('Error updating rating:', error.message);
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





