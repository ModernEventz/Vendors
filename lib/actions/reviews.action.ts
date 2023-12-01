"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { SubmitReviewParams } from './shared.types';


export async function submitReview(params: SubmitReviewParams) {

  
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { data: { user } } = await supabase.auth.getUser()
        

      
        const { vendorId,name,message,rating } = params;
  
    // Update or insert the user's rating into the Supabase database
    const { data, error } = await supabase
      .from('reviews')
      .upsert([
        { vendor_id: vendorId, review_id:user.id,rating,Comments:message,reviewer_name:name,avatar,location }
      ]).select();

    if (error) {
      console.error('Error updating rating:', error.message);
    } else {
     console.log('ness');
    }
  


 console.log(data);

          return (data);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }





