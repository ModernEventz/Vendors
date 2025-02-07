//@ts-nocheck
"use client"
import React, { useState } from 'react'
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from 'uuid';
import { currentUser } from '@clerk/nextjs';
import { fileUpload } from '@/lib/actions/uploads.action';
import { useDropzone } from 'react-dropzone';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
import { createClient } from '@supabase/supabase-js';
import { User } from '@clerk/nextjs/server';
import { insertVendors } from '@/lib/actions/vendor.action';
import { useToast } from "@/components/ui/use-toast"
import { setTotalPosts } from '@/lib/Store/slice';
import { useDispatch } from 'react-redux';
import LocationDropdown from '@/components/ui/LocationDropDown';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Page = (props) => {
  const { toast } = useToast()
  const { user } = useUser();
  const dispatch = useDispatch();
  const [publicUrls, setPublicUrls] = useState(['']);

  async function uploadImage(e) {
    const files = e.target.files;
    
    // Limit the number of files to 4 images
    if (files.length > 4) {
      toast({
        title: "Too many files",
        description: "Please select up to 4 images only.",
        variant: "destructive",
      });
      return;
    }

    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Optional: Check file type before uploading (only allow image files)
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Only image files are allowed.",
          variant: "destructive",
        });
        continue;
      }
      
      const filePath = user?.id + "/" + uuidv4();
    
      const { data, error } = await supabase
        .storage
        .from('uploads')
        .upload(filePath, file);

      if (error) {
        toast({
          title: "Upload error",
          description: error.message,
          variant: "destructive",
        });
        continue;
      }
      
      const publicURL = supabase
        .storage
        .from('uploads')
        .getPublicUrl(filePath).data.publicUrl;
        
      urls.push(publicURL);
      console.log('URLs to be inserted:', urls);
      setPublicUrls(urls);
    }
    console.log('Final URLs to be inserted:', urls);
  }

  // Initialize the form.
  // Ensure that your eventFormSchema and eventDefaultValues include a property for preferNotSpecifyPrice.
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      ...eventDefaultValues,
      preferNotSpecifyPrice: false, // Add a default for the new field
    }
  })

  // Watch the preferNotSpecifyPrice field to disable the price input if needed.
  const preferNotSpecifyPrice = form.watch('preferNotSpecifyPrice');

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const { data, error } = await insertVendors({
      title: values.title,
      location: values.location,
      price: preferNotSpecifyPrice ? null : values.price,
      description: values.description,
      category: values.categoryId,
      publicUrls,
    });
    
    if (error) {
      console.error('Error fetching vendor data:', error.message);
    } else {
      toast({
        description: "Your post has been sent successfully.",
      });
      dispatch(setTotalPosts());
    }
  }

  return (
    <div>
      <div className='pb-4'>
        <p className='text-3xl font-bold underline underline-offset-1 text-rose-600 text-center'>
          Create A Post
        </p>
      </div>
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
                  <FormControl className="h-72">
                    <input
                      type="file"
                      accept="image/*"  // Only allow images.
                      multiple
                      onChange={(e) => uploadImage(e)}
                    />
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
                <FormItem className="w-full">
                  <FormControl>
                    <LocationDropdown onChangeHandler={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-col gap-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className="flex-center bg-grey-50 h-[54px] w-full overflow-hidden rounded-full px-4 py-2">
                        <Image
                          src="/assets/icons/ghana-cedis-icon.svg"
                          alt="currency"
                          width={24}
                          height={24}
                          className="filter-grey"
                        />
                        <Input
                         
                          placeholder="Price"
                          {...field}
                          className="p-regular-16 bg-grey-50 border-2 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          disabled={preferNotSpecifyPrice}  // Disable if user prefers not to specify a price
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Radio button field */}
              <FormField
                control={form.control}
                name="preferNotSpecifyPrice"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <input
                        type="radio"
                        id="preferNotSpecifyPrice"
                        checked={field.value}
                        onChange={() => field.onChange(true)}
                      />
                    </FormControl>
                    <FormLabel htmlFor="preferNotSpecifyPrice" className="cursor-pointer">
                      Prefer not specify a price
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="bg-rose-600 text-white"
          >
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Page
