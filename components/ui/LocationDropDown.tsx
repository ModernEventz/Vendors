//@ts-nocheck
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { gCities } from '@/constants'
type DropdownProps = {

    value?: string
    onChangeHandler?: (value:string) => void
}

const LocationDropdown = ({value, onChangeHandler}: DropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value} >
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Location" />
  </SelectTrigger>
  <SelectContent className="max-h-48 overflow-y-auto">
        {gCities.map((city, index) => (
          <SelectItem key={index} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
</Select>

  )
}

export default LocationDropdown
