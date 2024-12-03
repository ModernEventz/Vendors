//@ts-nocheck
"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,useDisclosure} from "@nextui-org/react";


import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


import { submitCheckList } from '@/lib/actions/checkList.actions';


 


const AddCheckList = ({}) => {
  const options = ['Todo', 'In Progress','Done','Cancelled' ];
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);

  

  const [category, setCategory] = useState('');
  

  const dropdownItems = ['Venue', 'Caterer', 'Decor', 'Photographer','Mc','Dj','Food and Drinks','MakeUp','Ring','Transport'];
  const { toast } = useToast()

 
  const handleRadioChange = (value) => {
    setStatus(value);
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setCategory(selectedValue);
  };


  const handleSubmitClick = async () => {
    
     
    
     // Update or insert the user's rating into the Supabase database
     const  { data, error } =  await submitCheckList({ status,title,category,date, path: `/Clist`})
 
     if (error) {
      console.error('Error fetching data:', error.message);
      } else {
        toast({
          description: "Task successfully  added.",
        })
        setIsModalOpen(false);
      }      
     
   
   
 
    
 
   
  }
  

  


  return (
    <>
         
      <Button className="bg-rose-600 font-bold text-white"  variant="outline"  onClick={onOpen}> <PlusCircledIcon className="mr-2 h-4 w-4 " />Add a Task</Button>
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Add a Task</ModalHeader>
            <ModalBody className="flex flex-col place-items-center gap-1"  >
              <div  className="flex flex-col gap-1" > 
               
              <div className="grid w-full max-w-sm  gap-1.5">
      <Label htmlFor="item">Specify a title for the task </Label>
      <Input className='bg-slate-50 shadow-md' type="text" id="item" placeholder="e.g. caterer cost"
       value={title}
       onChange={(ev) => setTitle(ev.target.value)} />
    </div>


     
    <div className="my-3 grid w-full  max-w-sm gap-1.5">
      <Label htmlFor="cost">Category</Label>
      <select
        id="dropdown"
        value={category}
        onChange={handleDropdownChange}
      
        className='bg-slate-50 pb-5 shadow-md'
      >
        {/* Mapping through the items to create dropdown options */}
        {dropdownItems.map((item, index) => (
          <option key={index} value={item} className='scroll-auto bg-slate-200  text-center'>
            {item}
          </option>
        ))}
      </select>
    </div>

    <div className="my-3 grid w-full  max-w-sm gap-1.5">
      <Label htmlFor="cost">Date</Label>
      <input
              type="date"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
              className='bg-slate-50 shadow-md'
            />
    </div>

   

    <div className='my-3 grid w-full  max-w-sm gap-1.5 bg-slate-50 shadow-md'>
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
                Add Task
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

export default AddCheckList
