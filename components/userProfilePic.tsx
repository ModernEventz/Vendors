//@ts-nocheck
import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getTimestamp } from '@/lib/utils'
import Image from "next/image";
// import { currentUser } from '@clerk/nextjs';
const generateAvatar = (name) => {
  const initials = name ? name[0].toUpperCase() : '?'; // Use '?' if name is not provided
  const avatarUrl = `https://ui-avatars.com/api/?name=${initials}`;

  return <Image src={avatarUrl} alt={`${initials} Avatar`} />;
};

const  userProfilePic = async ({ userName, profileImage,Reviews }) => {
  
 
  return (
    <div className='flex flex-col'>
         <div  className='flex flex-row'>
         <div className=''>
        {/*  avatar */}
  

{profileImage ? (
             <Avatar>
             <AvatarImage src={profileImage} alt={`${userName} Avatar`} />   
           </Avatar>
       
      ) : (
        generateAvatar(userName)
      )}

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

export default userProfilePic
