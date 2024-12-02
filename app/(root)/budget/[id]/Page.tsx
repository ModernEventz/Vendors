"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ParamsProps } from '@/types'



const Page = ({ params }: ParamsProps) => {
  
  


    const [item, setItem] = useState("");
  const [cost, setCost] = useState(0);

  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Edit budget {params.id}</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Item</Label>
            <Input id="item" value={item}
       onChange={(ev) => setItem(ev.target.value)}/>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Cost</Label>
            <Input id="cost" value={cost}
       onChange={(ev) => setCost(parseInt(ev.target.value))}/>
          </div>
      
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button className="bg-rose-600 font-bold text-white"  >Save</Button>
    </CardFooter>
  </Card>
  )
}

export default Page