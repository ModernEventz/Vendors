//@ts-nocheck
"use client"
import React, { useState,useEffect } from 'react'
import { useUser } from "@clerk/clerk-react";

import { v4 as uuidv4 } from 'uuid';
import { currentUser } from '@clerk/nextjs';

import { fileUpload } from '@/lib/actions/uploads.action';

import {useDropzone} from 'react-dropzone';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from '@/components/ui/Dropdown'
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"

import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'


import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from "next/navigation"


// import { createEvent, updateEvent } from "@/lib/actions/event.actions"

import { createClient } from '@supabase/supabase-js';
import { User } from '@clerk/nextjs/server';
import { deleteVendors, getVendorDetailsById, insertVendors, updateVendors } from '@/lib/actions/vendor.action';
import { useToast } from "@/components/ui/use-toast"
import { ParamsProps } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 const supabase = createClient(supabaseUrl, supabaseKey);



const Page = ({ params }: ParamsProps) => {

  const { toast } = useToast()
  const { user } = useUser();
  



  
  useEffect(() => {
    const fetchData = async () => {
      const vendor = await getVendorDetailsById({ vendorId: params.id})
     
   
      if (vendor) {
        
        eventDefaultValues.title = vendor[0].vendor_name;
        eventDefaultValues.categoryId =  vendor[0].category;
        eventDefaultValues.description = vendor[0].description;
        eventDefaultValues.location = vendor[0].location;
        eventDefaultValues.price = vendor[0].price
        setPublicUrls(vendor[0].images); 
      }
    };

    fetchData();
  }, [params.id]);
   

 
   
 

 

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: eventDefaultValues,
      
        
      })
     
      async function onSubmit(values: z.infer<typeof eventFormSchema>) {

        
        const { data, error } = await deleteVendors({vendorId:params.id})
        
       
       
     if (error) {
      console.error('Error fetching vendor data:', error.message);
      } else {
        toast({
          description: "Your post has been successfully deleted.",
        })
        
      }   
     
      
    
       
    
      
      }
 
     
  return (
    <div>
      <div className='pb-4'><p  className='text-3xl font-bold underline underline-offset-1 text-rose-600 text-center  '>Update Post</p></div>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Title" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72 ">


                  <input type="file" multiple onChange={(e) => uploadImage(e)} />
                   
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <div className="flex-center bg-grey-50 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="Event location " {...field} className="input-field" />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className='w-full '>
                  <FormControl>
                    <div className="flex-center bg-grey-50 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                      <Image
                        src="/assets/icons/ghana-cedis-icon.svg"
                        alt="dollar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <Input type="number" placeholder="Price" {...field} className="p-regular-16 bg-grey-50 border-2 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                           
          
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />   
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

       

       
<Button type="submit"
          size="lg"
          disabled={form.formState.isSubmitting} className="bg-rose-600 text-white ">  {form.formState.isSubmitting ? (
            'Submitting...'
          ): 'submit'}</Button>

      </form>
    </Form>
    </div>
  )
}

export default Page
