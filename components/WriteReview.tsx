"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import { submitReview } from '@/lib/actions/reviews.action';
const WriteReview = ({vendorId}) => {
  const [message, setMessage] = useState('');
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleRatingClick = async (rating) => {
    // Update or insert the user's rating into the Supabase database
   const {data}= await submitReview({ vendorId})
  };
  return (
    <>
         
      <Button className=" my-1 w-40 bg-rose-600 font-bold text-white sm:w-40 md:w-40"  variant="outline"  onClick={onOpen}>Write a review</Button>
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Write a Review</ModalHeader>
            <ModalBody className="flex flex-col gap-1"  >
              <div  className="flex flex-col gap-1" > 
              
              <Avatar className='py-2'>
                 <AvatarImage src="https://github.com/shadcn.png" />
                 <AvatarFallback>CN</AvatarFallback>
                   </Avatar>

              <p className='py-2'>kelvin25</p> 
              <p className='py-2'>Location</p>    
              </div>
              <div>
              
      {/* Display star icons for user to click on */}
      {[1, 2, 3, 4, 5].map((rating) => (
        <span
          key={rating}
          onClick={() => handleRatingClick(rating)}
          style={{ cursor: 'pointer' }}
        >
          ⭐️
        </span>
      ))}
              </div>
              <div>
                 {/* Message input */}
                <label>Message:</label>
                 <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
      />
              </div>
            </ModalBody>
            <ModalFooter className='py-5'>
              <Button  variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-rose-600 text-white sm:w-40 md:w-40 font-bold  " onClick={onClose}>
                Review
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  )
}

export default WriteReview