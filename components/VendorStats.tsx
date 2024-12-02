
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTimestamp } from '@/lib/utils'
// import { currentUser } from '@clerk/nextjs';

const  VendorStats = async ({Reviews,avatar}) => {
  
  return (
    <div className='flex flex-col'>
         <div  className='flex flex-row'>
         <div className=''>
        {/*  avatar */}
        <Avatar>
  <AvatarImage src={avatar} />   
  <AvatarFallback>{''}</AvatarFallback> 
</Avatar>

        </div>
        <div className='mx-3'>
        <p className='font-bold'>{""}</p>
        <p className='text-sm'> Joined {getTimestamp(new Date(""))}</p>
        </div>
        </div>
        <div  className='my-2'>
        <dd className="text-rose-600 flex items-center dark:text-rose-400">
         <svg width="20" height="20" fill="red" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
        
        
      
      
         <span className='mx-5 my-1'>{Reviews} Reviews </span>
         
       </dd>
        </div>
        <div>
        <p></p>
        </div>
    </div>
  )
}

export default VendorStats