//@ts-nocheck
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";



import { submitBudget, updateBudgetById } from '@/lib/actions/budget.action';
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from 'next/link';

 

 


const MessageDetails = ({Message}) => {
  const options = ['Paid', 'Not Paid' ];
  const [message, setMessage] = useState("");
  const [cost, setCost] = useState(0);
  const [status, setStatus] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  const { toast } = useToast()

  useEffect(() => {
   setMessage(Message);
 

  }, [Message]);
 
  const handleRadioChange = (value) => {
    setStatus(value);
  };

  const handleSubmitClick = async () => {
    
     
    
     // Update or insert the user's rating into the Supabase database
     const  { data, error } =  await updateBudgetById({ budgetId,item,cost,status, path: `/budget`})
 
     if (error) {
      console.error('Error fetching vendor data:', error.message);
      } else {
        toast({
          description: "Budget successfully  updated.",
        })
        setIsModalOpen(false);
      }      
     
   
   
 
    
 
   
  }
  

  


  return (
    <>
        
        <Link href={''}> <p className='line-clamp-1 underline-offset-4' onClick={onOpen}>Click to view Message</p></Link>
     
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Message Details</ModalHeader>
            <ModalBody className="flex flex-col place-items-center gap-1"  >
              <div  className="flex flex-col gap-1" > 
               
              <div className="grid w-full max-w-sm  gap-1.5">
            <p>{message}</p>
     
    </div>

    

  
    </div>
           
            </ModalBody>
            <ModalFooter className='py-5'>
              <Button  variant="outline" onClick={onClose}>
                Close
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

export default MessageDetails
