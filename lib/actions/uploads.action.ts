//@ts-nocheck
"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';

export interface uploadsParams {
  vendor_id: string;
  image_path: string;

}
  
export async function fileUpload(params: uploadsParams) {

  
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
       
        const user = await currentUser();
           
      
        const { vendor_id,image_path } = params;
  
         
    // Update or insert the user's rating into the Supabase database

    const { data, error } = await supabase
    .from('vendor_images')
    .insert([
      { vendor_id,image_path }
    ]).select();

   // revalidatePath(path)
    
  if (error) {
    console.error('Error inserting image:', error.message);
  } else {
   console.log('sent');
  }

  
   //      return (data);
  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
