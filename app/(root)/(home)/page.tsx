import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Dev Overflow',
}

export default async function Home() {
  

  return (
    <>
    <Card>
      <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            
          </div>
        
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4 hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500">
                  <CardHeader  className="flex flex-row justify-between  ">
                    <CardTitle className="text-sm font-medium">
                    Vendors Hired
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <div className="flex flex-row justify-between  " >
                    <p className="text-xs text-muted-foreground">
                      0%
                    </p>
                    <Button className=" bg-rose-600 text-white">Add a Vendor</Button>
                    </div>
                  </CardContent>
                </Card>
               
                <Card className="col-span-4 hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500" >
                  <CardHeader  className="flex flex-row justify-between  " >
                    <CardTitle className="text-sm font-medium">
                      Tasks Completed
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <div className="flex flex-row justify-between  " >
                    <p className="text-muted-foreground text-xs">
                      0%
                    </p>
                    <Button className=" bg-rose-600 text-white">Add a task</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-4 hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500">
                  <CardHeader  className="flex flex-row justify-between  " >
                    <CardTitle className="text-sm font-medium">Budget</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <div className="flex flex-row justify-between  " >
                    <p className="text-xs text-muted-foreground">
                      0%
                    </p>
                    <Button className=" bg-rose-600 text-white">Add a budget</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-4 hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500">
                  <CardHeader  className="flex flex-row justify-between  " >
                    <CardTitle className="text-sm font-medium">
                      Shopping Cart
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <div className="flex flex-row justify-between  " >
                    <p className="text-xs text-muted-foreground">
                      0%
                    </p>
                    <Button className=" bg-rose-600 text-white">Add to cart</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              

              
           
        </div>
        </Card>
    </>
  )
}

