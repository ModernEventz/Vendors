// import Filter from '@/components/shared/Filter'

// import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Toaster } from '@/components/ui/toaster'
// import { UserFilters } from '@/constants/filters'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <main className="background-light850_dark100 relative">
      
    
        
         {children}
       
         {/* <RightSidebar /> */}
       
  
        <Toaster />
      </main>
    )
  }
  
  export default Layout