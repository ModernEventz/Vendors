//@ts-nocheck
"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from "next/cache";
import { DeleteBudgetByIdParams, DeleteCheckListByIdParams, DeleteCheckListParams, GetBudgetByIdParams, GetCheckListByIdParams, SubmitBudgetParams, SubmitCheckListParams, UpdateBudgetByIdParams, UpdateCheckListByIdParams, deleteBudgetByIdParams } from './shared.types';

export async function getCheckListById(params:GetCheckListByIdParams ) {
    try {
        const supabase = createServerComponentClient ({cookies});
        const { profileId } = params;
   
const { data: checkList, error } = await supabase
.from('checklist')
.select('*')
.eq('profile_id', profileId)
.order('checklist_id', { ascending: true });
    
      return checkList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  
export async function submitCheckList(params: SubmitCheckListParams) {

  
  // eslint-disable-next-line no-useless-catch
  try {
     
      const supabase = createServerComponentClient ({cookies});
    
     
      const user = await currentUser();
         
    
      const { status,title,category,date,path } = params;

       
  // Update or insert the user's rating into the Supabase database
  const { data, error } = await supabase
    .from('checklist')
    .insert([
      { profile_id: user?.id, status,title,category,date}
    ]).select();

    revalidatePath(path)
    
  if (error) {
    console.error('Error updating CheckList:', error.message);
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


export async function updateCheckListById(params:UpdateCheckListByIdParams ) {
  try {
      const supabase = createServerComponentClient ({cookies});
      const { checkListId,title,category,status,date,path } = params;
 

      const { data:checkList, error } = await supabase
      .from('checklist')
      .update({  title,category,status,date })
      .eq('checklist_id', checkListId)
      .select()
              
      revalidatePath(path)
    return checkList;

  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function deleteCheckListById(params:DeleteCheckListByIdParams ) {
  
      const supabase = createServerComponentClient ({cookies});

      const { checkListId,path } = params;
   
const {  error } = await supabase
.from('checklist')
.delete()
.match({ checklist_id: checkListId })
.select();


  
revalidatePath(path)
}

export async function deleteCheckList(params: DeleteCheckListParams ) {
  
  const supabase = createServerComponentClient ({cookies});

  const { path } = params;

const {  error } = await supabase
.from('checklist')
.delete();




revalidatePath(path)
}



