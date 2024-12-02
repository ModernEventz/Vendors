"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";



import { submitBudget } from '@/lib/actions/budget.action';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

 

 


const AddBudget = ({}) => {
  const options = ['Paid', 'Not Paid' ];
  const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);
  const [status, setStatus] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);


  const { toast } = useToast()

 
  const handleRadioChange = (value) => {
    setStatus(value);
  };

  const handleSubmitClick = async () => {
    
     
    
     // Update or insert the user's rating into the Supabase database
     const  { data, error } =  await submitBudget({ status,item,cost, path: `/budget`})
 
     if (error) {
      console.error('Error fetching vendor data:', error.message);
      } else {
        toast({
          description: "Budget successfully  added.",
        })
        setIsModalOpen(false);
      }      
     
   
   
 
    
 
   
  }
  

  


  return (
    <>
         
      <Button className="bg-rose-600 font-bold text-white"  variant="outline"  onClick={onOpen}> <PlusCircledIcon className="mr-2 h-4 w-4 " />Add a budget</Button>
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Add a Budget</ModalHeader>
            <ModalBody className="flex flex-col place-items-center gap-1"  >
              <div  className="flex flex-col gap-1" > 
               
              <div className="grid w-full max-w-sm  gap-1.5">
      <Label htmlFor="item">Specify a budget item</Label>
      <Input className='bg-slate-50 shadow-md' type="text" id="item" placeholder="e.g. caterer cost"
       value={item}
       onChange={(ev) => setItem(ev.target.value)} />
    </div>

    <div className="my-3 grid w-full  max-w-sm gap-1.5">
      <Label htmlFor="cost">Cost of Item</Label>
      <Input className='bg-slate-50 shadow-md ' type="number" id="cost" placeholder="eg GHS 5000"
        value={cost}
        onChange={(ev) => setCost(parseInt(ev.target.value))} />
    </div>

    <div className='my-3 grid w-full  max-w-sm gap-1.5'>
    <Label htmlFor="cost">Status</Label>
    {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={status === option}
            onChange={() => handleRadioChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
    </div>
           
            </ModalBody>
            <ModalFooter className='py-5'>
              <Button  variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-40  " onClick={handleSubmitClick}>
                Add Budget
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

export default AddBudget