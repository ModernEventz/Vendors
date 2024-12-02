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

const ICarousel = ({ images, href }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

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
