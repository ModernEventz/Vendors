"use client"
import { useEffect, useState } from 'react';
import Link from "next/link"; 
import Image from "next/image";
import SimilarVendorCard from './SimilarVendorCard';
import ImageCarousel from './ImageCarousel';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import {  getSearchVendors , getVendorById } from "@/lib/actions/vendor.action";
import { useSearchParams } from 'next/navigation';

const MyPosts = () => {


  const searchParams = useSearchParams();

  const query = searchParams.get('q');
  const vendorCategory = searchParams.get('category');

  const [searchTerm, setSearchTerm] = useState(query || '');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState(vendorCategory || '');
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {

    
      const vendors:any|null = await getVendorById();

      if (vendors) {
        setData(vendors);
        setLoading(false);
      }

      
     
      }

    fetchData();
  }, []);



  return (

    <>
            {data.length > 0 ? (
          data.map((vendor)=> (
              
 <Card key={vendor.vendor_id} className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
   <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
     <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
       <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">{vendor.vendor_name}</h1>
       
     </div>
     <div className="col-start-1 col-end-3 row-start-1 grid gap-4 sm:mb-6 sm:grid-cols-4 lg:col-start-2 lg:row-span-6 lg:row-end-6 lg:mb-0 lg:gap-6">
                {vendor.images.map((url, index) => (
                    <div key={index} className={index === 0
                        ? "relative h-60 w-full sm:col-span-2 sm:h-52 lg:col-span-full"
                        : "relative hidden h-52 w-full md:block lg:col-span-2 lg:row-start-2 lg:h-32"}>
                        <Image
                            src={url}
                            alt={`Uploaded content ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
     { vendor.rating ?
     <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
       <dt className="sr-only">Reviews</dt>
      
       <dd className="text-rose-600 flex items-center dark:text-rose-400">
         <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         
         <span>{vendor.rating} <span className="text-slate-400 font-normal">({vendor.rating_count})</span></span>
         
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
      {vendor.location}
       </dd>
       
 
     </dl>
     :
     <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
       <dt className="sr-only">Reviews</dt>
      
       <dd className="text-indigo-600 flex items-center dark:text-indigo-400">
         
         
         <span >
        
      {vendor.location} 
           <span className="text-slate-400 font-normal"></span></span>
         
       </dd>
            
       <dt className="sr-only">Location</dt>
       <dd className="flex items-start">
       
       </dd>
       
 
     </dl>
 
 }
     <div className="col-start-1 row-start-3 mt-4 self-center sm:col-start-2 sm:row-span-2 sm:row-start-2 sm:mt-0 lg:col-start-1 lg:row-start-3 lg:row-end-4 lg:mt-6">
       <button type="button" className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium leading-6 text-white">Check availability</button>
     </div>
     <p className="col-start-1 mt-4 text-sm leading-6 dark:text-slate-400 sm:col-span-2 lg:col-span-1 lg:row-start-4 lg:mt-6">
     {vendor.description}
     </p>
     
   </div>
 </Card>
 
          ))
        ) : (
          <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <Button className="mt-4">Add Product</Button>
          </div>
        </div>
        )}
          
  </>
  )

  
}

export default MyPosts