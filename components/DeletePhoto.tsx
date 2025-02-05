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
      console.error('Error deleting  data:', error.message);
      } else {
        toast({
          description: "Photo successfully deleted.",
        })
        
        setIsModalOpen(false);
       
      }      
       
  }
  
async function deletePhoto_FromStorage(userId: string, photoName: string) {
  const { data, error } = await supabase.storage.from('uploads').remove([`${userId}/${photoName}`]);

  if (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }

  return data;
}
  


  return (
    <>
         
         <button onClick={onOpen}  className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded"> Delete  </button>
      
     
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Delete Photo</ModalHeader>
            <ModalBody className="flex flex-col place-items-center gap-1"  >
              <div  className="flex flex-col gap-1" > 
               <p>Are you sure you want to delete this photo </p>
             </div>
           
            </ModalBody>
            <ModalFooter className='py-5'>
              <Button  variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-40  " onClick={deletePhoto_FromStorage}>
                Delete
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
