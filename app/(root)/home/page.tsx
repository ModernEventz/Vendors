//@ts-nocheck
"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';

import { createClient } from '@supabase/supabase-js';


import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import InitialDialog from "@/components/InitialDialog";
import { useSelector } from 'react-redux'
import { RootState } from "@/lib/store";
import {  getSearchVendors , getProfileInfo } from "@/lib/actions/vendor.action";
import PhoneLocationModal from "@/components/PhoneLocationModal";
import { currentUser } from "@clerk/nextjs";

export default function Home() {
  

  const TotalPosts = useSelector((state:RootState) => state.totalPosts)
  const TotalOrders = useSelector((state:RootState) => state.totalOrders)

  const [showModal, setShowModal] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 const supabase = createClient(supabaseUrl, supabaseKey);






  useEffect(() => {
    const fetchData = async () => {

    
      const  profile  = await getProfileInfo();

      if (profile?.length === 1  ) {
        setShowModal(false);
        
      }

      else{
        setShowModal(true);
      }

      
     
      }

    fetchData();
  }, []);
  
  return (
    <>
        { showModal && (
           <PhoneLocationModal
        
        onClose={() => setShowModal(false)}
       
      />
        )
        }

    <Card>
      <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            
          </div>
        
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4 hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500">
                  <CardHeader  className="flex flex-row justify-between  ">
                    <CardTitle className="text-sm font-medium">
                    Total Posts
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
                    <div className="text-2xl font-bold">{TotalPosts}</div>
                    <div className="flex flex-row justify-between  " >
                    <p className="text-xs text-muted-foreground">
                    
                    </p>
                    <Button className=" bg-rose-600 text-white"><Link  href={"/eventform"}>  Add a Post</Link></Button>
                    </div>
                  </CardContent>
                </Card>
               
                <Card className="col-span-4 hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500" >
                  <CardHeader  className="flex flex-row justify-between  " >
                    <CardTitle className="text-sm font-medium">
                      Total Orders
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
                    <div className="text-2xl font-bold">{TotalOrders}</div>
                    <div className="flex flex-row justify-between  " >
                    <p className="text-muted-foreground text-xs">
                     
                    </p>
                    <Button className=" bg-rose-600 text-white"><Link  href={"/budget"}>View Orders</Link></Button>
                    </div>
                  </CardContent>
                </Card>
                
              </div>
              

              
           
        </div>
        </Card>

        
         
    </>
  )
}

