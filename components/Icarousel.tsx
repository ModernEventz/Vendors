//@ts-nocheck
"use client"
import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { deleteVendors } from "@/lib/actions/vendor.action";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";

const Dots = ({ images, currentIndex, setCurrentIndex }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <div
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-2 h-2 rounded-full cursor-pointer ${
            currentIndex === index ? "bg-gray-800" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
};



const ICarousel = ({ images, href,delete_id }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);
 
  const { toast } = useToast()


  async function deletePhoto() {
    const  {  error } =  await deleteVendors({ delete_id})

     if (error) {
      console.error('Error deleting  photo:', error.message);
      } else {
        toast({
          description: "Photo successfully deleted.",
        })
     
        setIsModalOpen(false);
       
      } 

//  return data;
} 
  
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
            <Button   className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded"  onClick={deletePhoto}>
              Delete
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>

  )}
       

  return (
    <Carousel className="relative w-full max-w-xs group">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative">
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                className="aspect-square rounded-2xl object-cover"
                width={350}
                height={250}
              />

<Link href={href}>
<Pencil1Icon width={30} height={30} className="absolute right-2 top-2 bg-primary-500 text-white rounded" /> 
</Link> 

<Link href={''} onClick={onOpen}>
<Pencil1Icon width={30} height={30} className="absolute right-2 top-2 bg-primary-500 text-white rounded" /> 
</Link> 
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-75 p-2 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-75 p-2 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Dots images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
    </Carousel>
  );
};

export default ICarousel;
