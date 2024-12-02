"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { updateCheckListById } from '@/lib/actions/checkList.actions';

 

 


const EditCheckList = ({checkListTitle,checkListCategory,checkListStatus,checkListDate,checkListId}) => {
  const options = ['Todo', 'In Progress','Done','Cancelled' ];
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  const { toast } = useToast()

  const dropdownItems = ['Venue', 'Caterer', 'Decor', 'Photographer','Mc','Dj','Food and Drinks','MakeUp','Ring','Transport'];

  useEffect(() => {
   setTitle(checkListTitle);
   setCategory(checkListCategory);
   setStatus(checkListStatus);
   setDate(checkListDate);

  }, [checkListTitle,checkListCategory,checkListDate,checkListStatus]);
 
  const handleRadioChange = (value) => {
    setStatus(value);
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setCategory(selectedValue);
  };

  const handleSubmitClick = async () => {
    
     
    
     // Update or insert the user's rating into the Supabase database
     const  { data, error } =  await updateCheckListById({ checkListId,title,status,date,category, path: `/Clist`})
 
     if (error) {
      console.error('Error fetching checklist data:', error.message);
      } else {
        toast({
          description: "CheckList successfully  updated.",
        })
        setIsModalOpen(false);
      }      
     
   
   
 
    
 
   
  }
  

  


  return (
    <>
       <Badge  onClick={onOpen} variant="outline"><svg className='mr-2' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></Badge>

     
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Edit CheckList</ModalHeader>
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
                Save
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

export default EditCheckList