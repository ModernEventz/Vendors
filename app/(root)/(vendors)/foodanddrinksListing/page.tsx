import Link from "next/link";

export default function page(){
    return (
        <>
     
        <div><Link href="/kumasi" className="mt-2 font-bold text-accent-blue">
              kumasi
            </Link></div>
            
        <div><Link href="/Accra" className="mt-2 font-bold text-accent-blue">
              Accra
            </Link></div>
        </>
        
    )
}