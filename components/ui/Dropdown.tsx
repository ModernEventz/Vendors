import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

type DropdownProps = {

    value?: string
    onChangeHandler?: (value:string) => void
}

const Dropdown = ({value, onChangeHandler}: DropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value} >
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Venue">Venue</SelectItem>
    <SelectItem value="Caterer">Caterer</SelectItem>
    <SelectItem value="Decoration">Decoration</SelectItem>
    <SelectItem value="Photographer">Photographer/Video</SelectItem>
    <SelectItem value="Mc">Mc</SelectItem>
    <SelectItem value="Dj">Dj</SelectItem>
    <SelectItem value="Drinks">Drinks</SelectItem>
    <SelectItem value="Makeup">Makeup</SelectItem>
    <SelectItem value="Rings">Rings</SelectItem>
    <SelectItem value="Transport">Transport</SelectItem>
    <SelectItem value="canopy">Canopy & Chairs</SelectItem>
    <SelectItem value="Sounds">Sound System</SelectItem>
    <SelectItem value="cake">Cake</SelectItem>
    <SelectItem value="usher">Ushers & Waiters</SelectItem>  
  </SelectContent>
</Select>

  )
}

export default Dropdown
