"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from "next/cache";
import { DeleteBudgetByIdParams, GetBudgetByIdParams, SubmitBudgetParams, UpdateBudgetByIdParams, deleteBudgetByIdParams } from './shared.types';

export async function getBudgetById(params:GetBudgetByIdParams ) {
    try {
        const supabase = createServerComponentClient ({cookies});
        const { profileId } = params;


       
   
const { data: budget, error } = await supabase
.from('bookings')
.select('*')
.eq('profile_id', profileId)
.order('id', { ascending: true });
    
      return budget;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  
export async function submitBudget(params: SubmitBudgetParams) {

  
  // eslint-disable-next-line no-useless-catch
  try {
     
      const supabase = createServerComponentClient ({cookies});
    
     
      const user = await currentUser();
         
    
      const { status,cost,item,path } = params;

       
  // Update or insert the user's rating into the Supabase database
  const { data, error } = await supabase
    .from('budget')
    .insert([
      { profile_id: user?.id, status,cost,item}
    ]).select();

    revalidatePath(path)
    
  if (error) {
    console.error('Error updating budget:', error.message);
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


export async function updateBudgetById(params:UpdateBudgetByIdParams ) {
  try {
      const supabase = createServerComponentClient ({cookies});
      const { budgetId,cost,item,status,path } = params;
 

      const { data:budget, error } = await supabase
      .from('budget')
      .update({  item, cost,status })
      .eq('budget_id', budgetId)
      .select()
              
      revalidatePath(path)
    return budget;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function deleteBudgetById(params:DeleteBudgetByIdParams ) {
  
      const supabase = createServerComponentClient ({cookies});

      const { budgetId,path } = params;
   
const {  error } = await supabase
.from('budget')
.delete()
.match({ budget_id: budgetId })
.select();


  
revalidatePath(path)
}





