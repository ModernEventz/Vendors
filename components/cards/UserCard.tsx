
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  
} from "@/components/ui/card"



interface Props {
  vendor: {
    id: number;
    image: string;
    title: string;
    url:string;
    
  }
}

const UserCard = async ({ vendor }: Props) => {


  return (
    

       <Card className="hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500">
       <div className="flex-1 space-y-4 p-8 pt-6">
        
     
    <Link href={vendor.url} className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article className=" light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image 
          src={vendor.image}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {vendor.title}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">{vendor.title}</p>
        </div>

       
      </article>
     </Link>
 
     </div>
     </Card>
  
  )
}

export default UserCard