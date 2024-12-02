"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"
import { MdDelete } from "react-icons/md";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import { Badge } from "@/components/ui/badge"
import { deleteCheckListById } from '@/lib/actions/checkList.actions';

 

 


const DeleteCheckList = ({checkListId}) => {
 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  const { toast } = useToast()


 
  const handleRadioChange = (value) => {
    setStatus(value);
  };

  const handleSubmitClick = async () => {
    
     
    
     // Update or insert the user's rating into the Supabase database
     const  {  error } =  await deleteCheckListById({ checkListId, path: `/Clist`})
 
     if (error) {
      console.error('Error fetching  data:', error.message);
      } else {
        toast({
          description: "CheckList successfully  Deleted.",
        })
        setIsModalOpen(false);
      }      
     
   
   
 
    
 
   
  }
  

  


  return (
    <>
         <Badge onClick={onOpen} variant="outline"><MdDelete /></Badge>

      
     
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Delete Task</ModalHeader>
            <ModalBody className="flex flex-col place-items-center gap-1"  >
              <div  className="flex flex-col gap-1" > 
               <p>Are you sure you want to delete this Task </p>
             </div>
           
            </ModalBody>
            <ModalFooter className='py-5'>
              <Button  variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-40  " onClick={handleSubmitClick}>
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

export default DeleteCheckList