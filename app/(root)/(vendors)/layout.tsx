import Filter from '@/components/shared/Filter'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Toaster } from '@/components/ui/toaster'
import { UserFilters } from '@/constants/filters'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <main className="background-light850_dark100 relative">
      
        
        <div className="mb-5 mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar 
            route="/community"
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
        
         {children}
       
         {/* <RightSidebar /> */}
       
  
        <Toaster />
      </main>
    )
  }
  
  export default Layout