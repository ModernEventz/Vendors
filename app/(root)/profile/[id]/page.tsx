//@ts-nocheck
import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { UserFilters } from '@/constants/filters'

import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import Image from "next/image";
import type { Metadata } from 'next';
import vendorTypes from '@/constants/vendorTypes'
import { currentUser } from "@clerk/nextjs";
import { getHiredVendorById } from "@/lib/actions/hiredVendors.action";
import {   getVendorById } from "@/lib/actions/vendor.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTimestamp } from '@/lib/utils'
import { Button } from "@/components/ui/button";


import { createClient } from '@supabase/supabase-js';



import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card, CardContent, CardHeader, CardTitle,

} from "@/components/ui/card"
import NoResult from '@/components/shared/NoResult'
import { ImageIcon, Pencil1Icon, PlusIcon, ReaderIcon, StarFilledIcon } from '@radix-ui/react-icons'
import ICarousel from '@/components/Icarousel'



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 const supabase = createClient(supabaseUrl, supabaseKey);

 
async function deletePhoto(userId: string, photoName: string) {
  const { data, error } = await supabase
    .storage
    .from('uploads')
    .remove([`${userId}/${photoName}`,'https://wjyimkeequncdarvitza.supabase.co/storage/v1/object/public/uploads/${user?.id}/${url.name}']);

  if (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }

  return data;
}

async function GetData() {
  // Fetch data from your API here.
  const vendor:any|null = await getVendorById();
  return vendor;
}

async function GetPhotos() {
  // Fetch data from your API here.
  const user = await currentUser();
  const { data, error } = await supabase.storage.from('uploads').list(user?.id + '/', {
    limit: 10,
    offset: 0,
    sortBy: {
      column: 'name', order:
        'asc'
    }
  });
 
  return data;
}


const generateAvatar = (name) => {
  const initials = name ? name[0].toUpperCase() : '?'; // Use '?' if name is not provided
  const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=F33A6A&color=fff`;

  return <img src={avatarUrl} alt={`${initials} Avatar`} className='rounded-full'/>;
};
const Page = async () => {
  
  const vendors = await GetData()
  const media = await GetPhotos()
  const user = await currentUser();

 
    
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 m-5">Profile</h1> 

      <div className='flex flex-row justify-start gap-x-20'>
        <div>

        {user?.imageUrl ? (
              <img     
              src={user.imageUrl}
                  alt='profile pic'              
                  
                  className="rounded-full"             
                   width={100}
                  height={100}
                  />
       
      ) : (
        generateAvatar(user?.primaryEmailAddressId)
      )}
       
             <div className='mt-6 flex flex-row gap-x-1'> <p className='text-base font-bold'>{user?.firstName}</p>
             <p className='text-base font-bold '>{user?.lastName}</p>
             </div>

          </div>

         <div>
          <p className='text-base font-medium text-slate-400'>No of posts:<span> {vendors.length}</span></p>
          <p className='text-base font-medium text-slate-400'>Date Joined: <span>{getTimestamp(new Date(user?.createdAt))}</span></p>

          <div className=''>
          <Link href={'/user-profile'}>
          <Button className=" my-14 w-40 bg-rose-600 font-bold text-white sm:w-40 md:w-40"variant="outline" > 
            <Pencil1Icon width={30} height={30} className='pr-2'/> Edit Profile
            </Button>
            </Link>

            <Link href={'/eventform'}>
          <Button className=" my-14 w-40 bg-rose-600 font-bold text-white sm:w-40 md:w-40"variant="outline" > 
            <PlusIcon width={30} height={30} className='pr-2'/> Add Post
            </Button>
            </Link> 
            </div> 
        </div>
      </div>

       

      <Tabs defaultValue="posts" >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts" className='rounded-lg bg-white text-lg font-semibold shadow-md '><ReaderIcon className='mr-2'/>Posts<span className='ml-8 text-slate-600'>{vendors.length}</span></TabsTrigger>
        <TabsTrigger value="photos" className='rounded-lg bg-white text-lg font-semibold shadow-md'><ImageIcon className='mr-2'/>Photos<span className='ml-8 text-slate-600'>{media.length}</span></TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Card>
          <CardHeader>
            <CardTitle>My Posts</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
          
      <section className="grid grid-cols-1 gap-4  md:grid-cols-3">
        {vendors.length > 0 ? (
          vendors.map((vendor)=> (
            <div  key={vendor.vendor_id}>    

          <div className="mb-2 flex rounded-2xl ">
                {/* image carousel */}
   
                 <ICarousel images={vendor.images}  href={`/update/${vendor.vendor_id}`} />
          </div>
          <div className='flex  justify-between'>
          <h2 className="font-bold">{vendor.location}</h2>
          <div className='flex  justify-between gap-x-1'>
          <StarFilledIcon className='mt-1'/>
          <span> {vendor.avgRating} <span className="font-normal text-slate-400">({vendor.totalRatings})</span></span>
          </div>
          </div>
          <h3 className="text-sm text-gray-500">{vendor.vendor_name}</h3>
          <div className="mt-1">
            <span className="font-bold">${vendor.price}</span> per night
          </div>
       
         </div>
 
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No posts yet</p>
            <Link href="/eventform" className="mt-2 font-bold text-accent-blue">
              Create your first post!
            </Link>
          </div>
        )}
      </section>
      
          </CardContent>
       
        </Card>
      </TabsContent>
      <TabsContent value="photos">
      <Card>
         
         <CardContent className="space-y-2">
         <section className="mt-12 flex flex-wrap gap-4">
       {media.length > 0 ? (
            media.map((url, index) => {
              return (<>
                <div key={index} className="relative">
               

                  <img src= {`https://wjyimkeequncdarvitza.supabase.co/storage/v1/object/public/uploads/${user?.id}/${url.name}`}
                  alt={`Image ${index}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />  

                  
                      <button
                   
                          className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded"
                        >
                          Delete
                        </button>
              </div>
              </>
              )
            })
       ) : (
         <NoResult 
           title="No Photos "
           description="It looks like there are no photos."
           link=""
           linkTitle="upoad a photo"
         />
       )}
     </section>
         </CardContent>
       
       </Card>
      </TabsContent>
    </Tabs>
 

      
    </>
  )
}

export default Page

 
           
