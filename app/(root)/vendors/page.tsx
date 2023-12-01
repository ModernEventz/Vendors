import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { UserFilters } from '@/constants/filters'

import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next';
import vendorTypes from '@/constants/vendorTypes'


import {
  Card,

} from "@/components/ui/card"
import { getAllVendors } from '@/lib/actions/vendor.action'

export const metadata: Metadata = {
  title: 'Vendors | Save TheDate',
}

const Page = async ({ searchParams }: SearchParamsProps) => {
  

  const result = await getAllVendors();
   console.log(result);
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

      
    </>
  )
}

export default Page