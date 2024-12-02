import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900"></h1>

        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            
          </div>
      </div>

     

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Skeleton className="col-span-4" />
        <Skeleton className="col-span-4" />
       
      </div>

     
    </section>
  )
}

export default Loading