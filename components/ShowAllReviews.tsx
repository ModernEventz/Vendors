"use client"
import {useState} from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTimestamp } from '@/lib/utils'


export default function ShowAllReviews({Reviews}) {

  const [showAllReviews,setShowAllReviews] = useState(false);

  if (showAllReviews) {
    return (
      <div className="absolute inset-0 min-h-screen bg-black text-white">
        <div className="grid gap-4 bg-black p-8">
          <div className="flex justify-between" >
            <h2 className="mr-48 text-3xl">Reviews</h2>
            <button onClick={() => setShowAllReviews(false)} className=" flex gap-1 rounded-2xl bg-black px-4 py-2 text-white shadow shadow-black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Close 
            </button>
          </div>

          {Reviews.map((review:any) => (
             
             <>
            <div>
            
            <div className='flex flex-col'>
         <div  className='flex flex-row'>
         <div className=''>
        {/*  avatar */}
        <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

        </div>
        <div className='mx-3'>
        <p className='font-bold'>{review.reviwer_name}</p>
        <p className='text-sm'>{getTimestamp(new Date(review.created_at))}</p>
        </div>
        </div>
        <div  className='my-2'>
        <dd className="flex items-center text-rose-600 dark:text-rose-400">
         <svg width="20" height="20" fill="red" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <svg width="20" height="20" fill="red" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <svg width="20" height="20" fill="red" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <svg width="20" height="20" fill="red" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <svg width="20" height="20" fill="red" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         <span className='mx-5 my-1'>{review.rating} </span>
         
       </dd>
        </div>
        <div>
        <p>{review.comments}</p>
        </div>
    </div>
       
            </div>
            </>
              ))}
         
        </div>
      </div>
    );
  }

  return (
    
   <div>
      <Button onClick={() => setShowAllReviews(true)}  className=" my-3 w-40 bg-rose-600 font-bold text-white sm:w-40 md:w-40">show all reviews</Button>

      
    </div>
    
  );
}