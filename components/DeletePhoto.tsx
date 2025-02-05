// @ts-nocheck
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"
import { MdDelete } from "react-icons/md";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import { Badge } from "@/components/ui/badge"
import { getHiredVendorsById, submitHiredVendor } from '@/lib/actions/hiredVendors.action';
import Link from 'next/link';
import {  useDispatch } from 'react-redux';
import { RootState } from "@/lib/store";
import { setVendors } from '@/lib/Store/slice';

 

 


const DeletePhoto = ({userId,photoName}) => {
 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  const { toast } = useToast()

  const dispatch = useDispatch();
 
  const handleRadioChange = (value) => {
    setStatus(value);
  };

  const handleSubmitClick = async () => {
    
     
    
     // Update or insert the user's rating into the Supabase database
     const  {  error } =  await submitHiredVendor({vendor_id,vendor_name,location,price,rating,rating_count,description,images,profile_id,category})
 
     if (error) {
      console.error('Error fetching  data:', error.message);
      } else {
        toast({
          description: "Vendor successfully Hired.",
        })
        dispatch(setVendors());
        setIsModalOpen(false);
       
      }      
     
   
   
 
    
 
   
  }
  

  


  return (
    <>
         <a className="my-2 block font-semibold underline" onClick={onOpen}  href={``}>Mark Vendor as hired</a>

      
     
      {isModalOpen && (
      <Modal 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
      <ModalContent className='bg-white'>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Mark Vendor As Hired</ModalHeader>
            <ModalBody className="flex flex-col place-items-center gap-1"  >
              <div  className="flex flex-col gap-1" > 
               <p>Are you sure you want to mark this vendor as hired </p>
             </div>
           
            </ModalBody>
            <ModalFooter className='py-5'>
              <Button  variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-40  " onClick={handleSubmitClick}>
                Mark as Hired
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    )}
    </>
  )
}

export default DeletePhoto
