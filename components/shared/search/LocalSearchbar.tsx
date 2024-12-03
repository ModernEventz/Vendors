//@ts-nocheck
"use client"

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure, ModalProps} from "@nextui-org/react";
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { getAllVendors, getSearchVendors } from '@/lib/actions/vendor.action'
import { Card } from "@/components/ui/card";
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CustomInputProps {
  route: string
  iconPosition: string
  imgSrc: string
  placeholder: string
  otherClasses?: string
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');

  const [searchTerm, setSearchTerm] = useState(query || '');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollBehavior, setScrollBehavior] =  React.useState<ModalProps["scrollBehavior"]>("outside");
  const [size, setSize] = React.useState<ModalProps["size"]>("lg");
  

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(searchTerm) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: searchTerm
        })
        const fetchData = async () => {
        const vendors:any|null = await getSearchVendors({Page:page, searchTerm});
        if (vendors) {
          setData(vendors);
          setIsModalOpen(true);
          onOpen()
          console.log('hi');
        }
        return {vendors}
        }
        fetchData()
        router.push(newUrl, { scroll: false });
      } else {
        console.log(route, pathname)
        if(pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q']
          })

          router.push(newUrl, { scroll: false });
        }

      }
    }, 300);
    
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, route, pathname, router, searchParams, query,page,onOpen])

  return (
    <>    <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
      {iconPosition === 'left' && (
        <Image 
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === 'right' && (
        <Image 
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>

    {isModalOpen && (

<Modal 
      size={size} 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      scrollBehavior={scrollBehavior}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
       
      }}
    >
      <ModalContent className='bg-white '>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Search Results</ModalHeader>
            <ModalBody className="flex flex-col gap-1 "  >
              
              
              {
   


   data.map((vendor:any)=> (
  // <VendorCard key={vendor.vendor_id} _id={vendor.vendor_id} title={vendor.vendor_name} images={vendor.images} rating={vendor.rating} rating_count={vendor.rating_count} location={vendor.location} price={vendor.price} created_at={""} updated_at={""} />
 
    
 <Link key={vendor.vendor_id} href={`/${vendor.vendor_id}`}>       
 <Card className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
 <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
 <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
 <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">{vendor.vendor_name}</h1>
 <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">Entire house</p>
 </div>
 {vendor.images.map((image:any) => (
     
   
 <div key={image.image_id} className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
 <img src={image.image_path} alt="" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy"/>
 <img src={image.image_path} alt="" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy"/>
 <img src={image.image_path}alt="" className="hidden w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy"/>
 </div>
 ))}
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
 This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.
 </p>
 
 </div>
 </Card>
 </Link> 
 ))
 
 
 }
                
              
             
              
   
        
      
            </ModalBody>
          
          </>
        )}
      </ModalContent>
    </Modal>
    )
}
</>

  )
}

export default LocalSearchbar
