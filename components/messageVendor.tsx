"use client"
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
// import {Input} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookVendor } from "@/lib/actions/booking.actions";
import { revalidatePath } from 'next/cache'



export default function MessageVendor({vendorId,price,vendorName,username,email,path }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const [message, setMessage] = useState('');
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(true);

  

 
  const handleSubmitClick = async () => {
  
    
     // Update or insert the user's rating into the Supabase database
     const { data, error } =  await BookVendor({ vendorId,message,email,date,time,price,username,numberOfGuests,phoneNumber  })
 
     if (error) {
      console.error('Error fetching vendor data:', error.message);
      } else {
       
        toast({
          description: "Your message has been sent.",
        })
        setIsModalOpen(false);
      }      
     
  }
  




  return (
   <div>
      <Button className=" my-3   w-full bg-rose-600 font-bold text-white sm:w-96 md:w-80 "  onClick={onOpen}>Message Vendor</Button>
      {isModalOpen && (
      <Modal 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
      <ModalContent className='h-auto w-1/2 bg-white md:h-auto'>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">{vendorName}</ModalHeader>
            <ModalBody className="flex flex-col gap-6"  >
            <p className="font-bold ">Message Vendor</p>
              <div  className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap"> 
                 {/* Name */}
                

                 <Input
          type="text"
         
          placeholder="Name"
          
          className="rounded-lg bg-white shadow-md"
          value={username}
          
           disabled
         
         
          
          
        />
              </div>
              <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap" >
              
                 {/* Email  and phone number */}

                 <Input
          type="email"
         
          placeholder="Email"
         
          className="rounded-lg bg-white shadow-md"
          
          value={email}
          disabled
          
          
        />
             <Input
          type="tel"
          
          placeholder="PhoneNumber"
         
          className="rounded-lg bg-white shadow-md"
          value={phoneNumber}
          onChange={(ev) => setPhoneNumber(ev.target.value)}
           
       
        />
             </div>

              <div className="grid w-full max-w-sm items-center gap-1.5" >
                 {/* Event date */}
                 <Label htmlFor="email">Event Date</Label>
                 <Input
          type="date"
         
          placeholder="month"
          value={date}
          disabled
         
          className="rounded-lg bg-white shadow-md"

         
          
          
        />
       
          
              </div>
              <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message"  value={message}  onChange={(e) => setMessage(e.target.value)} />
    </div>
            </ModalBody>
            <ModalFooter className='py-5'>
              
              <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-full  " onClick={handleSubmitClick} >
                Send
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    )}
    </div>
  );
}
