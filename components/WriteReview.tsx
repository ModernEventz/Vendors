//@ts-nocheck
"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import { submitReview } from '@/lib/actions/reviews.action';

const WriteReview = ({vendorId,username,userimage}) => {
  const [message, setMessage] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { toast } = useToast()

  const handleRatingClick =  (rating) => {
  
    setUserRating(rating);
    
  
  };

  const handleSubmitClick = async (rating) => {
    rating= userRating;
    
     // Update or insert the user's rating into the Supabase database
     const { data, error } =  await submitReview({ vendorId,message,rating, path: `/vendors/${vendorId}`})
 
     if (error) {
      console.error('Error fetching vendor data:', error.message);
      } else {
        toast({
          description: "Your review has been sent.",
        })
        setIsModalOpen(false);
      }      
     
    handleRatingClick(rating);
   

 
   
  }
  

  const handleRatingHover = (rating) => {
    setHoverRating(rating);
  };

  
  const ratingMessage = () => {
    if (userRating === 0) {
      return '';
    } else if (userRating <= 2) {
      return 'Poor';
    } else if (userRating <= 3) {
      return 'Fair';
    } else if (userRating <= 4) {
      return 'Good';
    } else {
      return 'Excellent';
    }
  };

  return (
    <>
         
      <Button className=" my-1 w-40 bg-rose-600 font-bold text-white sm:w-40 md:w-40"  variant="outline"  onClick={onOpen}>Write a review</Button>
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
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Write a Review</ModalHeader>
            <ModalBody className="flex flex-col place-items-center gap-1"  >
              <div  className="flex flex-col gap-1" > 
              
              <Image alt='' src={userimage} width={70} height={70} className='rounded-full'/>

              <p className='py-2'>{username}</p> 
                
              </div>
              <div>
              
      {/* Display star icons for user to click on */}
      <div  className='flex flex-row'>
      {[1, 2, 3, 4, 5].map((rating) => ( 
       
        <span key={rating} 
       
        onClick={() => handleRatingClick(rating)}
        
       
          style={{ cursor: 'pointer', 
          color: rating <= ( userRating) ? 'rose' : 'grey',}}
         
        >
         <svg width="24" height="24" fill="red" aria-hidden="true" className="mr-1 stroke-current dark:stroke-indigo-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         
        </span>
      ))}
      </div>
        
        <p> {ratingMessage()}</p>
              </div>

              <div>
                 {/* Message input */}
                
                 <textarea
                  value={message}
                  placeholder='Enter a review'
                  className='h-20 w-48 bg-slate-100'
                  onChange={(e) => setMessage(e.target.value)}
      />
              </div>
            </ModalBody>
            <ModalFooter className='py-5'>
              <Button  variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-40  " onClick={handleSubmitClick}>
                Review
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

export default WriteReview
