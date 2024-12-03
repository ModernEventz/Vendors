//@ts-nocheck
import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { UserFilters } from '@/constants/filters'

import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next';
import vendorTypes from '@/constants/vendorTypes'
import { currentUser } from "@clerk/nextjs";
import { getHiredVendorById } from "@/lib/actions/hiredVendors.action";

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


export const metadata: Metadata = {
  title: 'Vendors | Save TheDate',
}

async function GetData() {
  // Fetch data from your API here.
  const user = await currentUser();
  const hiredVendor :any|null = await getHiredVendorById ({profile_Id:user?.id});
  return hiredVendor;
}
const Page = async ({ searchParams }: SearchParamsProps) => {
  
  const hiredVendors = await GetData()

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">VENDORS</h1> 

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar 
            route="/vendors"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for amazing minds"
            otherClasses="flex-1"
          />

          <Filter
            filters={UserFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
      </div>

      <Tabs defaultValue="vendors" >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="vendors" className='rounded-lg bg-white text-lg font-semibold shadow-md '>Vendors</TabsTrigger>
        <TabsTrigger value="hired_vendors" className='rounded-lg bg-white text-lg font-semibold shadow-md'>My Hired Vendors<span className='ml-8 text-slate-600'>{hiredVendors.length}</span></TabsTrigger>
      </TabsList>
      <TabsContent value="vendors">
        <Card>
          <CardHeader>
            <CardTitle>VENDORS</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
          <Card className='mt-5'>
      <section className="grid grid-cols-1 gap-4  md:grid-cols-3">
        {vendorTypes.length > 0 ? (
          vendorTypes.map((vendor)=> (
            <UserCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      </Card>
          </CardContent>
       
        </Card>
      </TabsContent>
      <TabsContent value="hired_vendors">
      <Card>
         
         <CardContent className="space-y-2">
         <section className="mt-12 flex flex-wrap gap-4">
       {hiredVendors.length > 0 ? (
         hiredVendors.map((vendor)=> (
           <Link key={vendor.vendor_id} href={`/${vendor.vendor_id}/${vendor.category}`}>       
<Card className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
  <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
    <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
      <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">{vendor.vendor_name}</h1>
      <p className="text-sm leading-4 font-medium text-white sm:text-slate-500 dark:sm:text-slate-400">{vendor.category}</p>
    </div>
   
            
          
    <div  className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
      <img src={vendor.image} alt="" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy"/>
    
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
</Link> 
         ))
       ) : (
         <NoResult 
           title="No Hired vendor"
           description="It looks like there are no hired vendors."
           link="/vendors"
           linkTitle="Look for a vendor"
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
