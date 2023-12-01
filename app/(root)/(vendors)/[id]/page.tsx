"use server"
import Link from "next/link"; 
import Image from "next/image";

import {  getVendorById } from "@/lib/actions/vendor.action";
import { ParamsProps } from "@/types";
import PlaceGallery from "@/components/PlaceGallery";
import BookingWidget from "@/components/BookingWidget";
import RatingDetails from "@/components/RatingDetails";
import { Button } from "@/components/ui/button";
import ShowAllReviews from "@/components/ShowAllReviews";
import WriteReview from "@/components/WriteReview";






const Page = async ({ params }: ParamsProps) => {
    const {vendor_name,location,price,images,rating,rating_count,description,reviews} = await getVendorById({ vendorId: params.id})
   
    return (
        <>
    
 
    <div className="-mx-8 mt-4 bg-gray-100 px-8 pt-8">
      <h1 className="text-3xl">{vendor_name}</h1>
      <a className="my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='}>{location}</a>
      
 
   <PlaceGallery vendorImages={images}/>

   <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
           {description}
            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">

            </p>  
          </div>
          { rating ?
     <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
    
       <dt className="sr-only">Reviews</dt>
      
       <dd className="text-rose-600 flex items-center dark:text-rose-400">
         <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         
         <span>{rating} <span className="text-slate-400 font-normal">({rating_count})</span></span>
         
       </dd>
       
       
     
         
 
         
           
           
       <dt className="sr-only">Location</dt>
       <dd className="flex items-center">
         <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
           <circle cx="1" cy="1" r="1" />
         </svg>
         <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
           <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
           <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
         </svg>
      {location}
       </dd>
       
 
     </dl>
     :
     <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
       <dt className="sr-only">Reviews</dt>
      
       <dd className="text-rose-600 flex items-center dark:text-rose-400">
         
         
         <span >
        
      {location} 
           <span className="text-slate-400 font-normal"></span></span>
         
       </dd>
            
       <dt className="sr-only">Location</dt>
       <dd className="flex items-start">
       
       </dd>
       
 
     </dl>
 
 }
        </div>
        <div>
        {  <BookingWidget price={price} />  }
        </div>
      </div>
      
   
      <div className="-mx-8 border-t bg-white p-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <WriteReview vendorId={params.id}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
        {reviews.map((review:any, index:any) => {
          
          if (index > 3) {
            return true; // Break out of the loop
          }
             
             return (
              <>
              
              <div  
               className="mb-4 mt-2 text-sm leading-5 text-gray-700 " key={review.review_id}>{<RatingDetails reviews={review} />}</div> 
            
             
                 { index === 3 && (
                   
               <div>



              <ShowAllReviews Reviews={reviews}/>

                </div> )
                
        
                }
                </>
                 )
              })}
              </div>
      
      </div>
    </div>
  


      </>
        
    )
}
export default Page