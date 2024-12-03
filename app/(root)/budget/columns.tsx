//@ts-nocheck
"use client"
import { ColumnDef ,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {bookings } from "@/types/collections";
import { getTimestamp } from '@/lib/utils'
import { Checkbox } from "@/components/ui/checkbox"
import MessageDetails from "@/components/MessageDetails"
import { Input } from "@/components/ui/input"
    const columns: ColumnDef<bookings>[] = [
  
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="border-rose-600"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-rose-600"
          />
        ),
      },
    
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "phone_number",
           header: "Number"
        },
        {
          accessorKey: "message",
           header: "Message",
           cell: ({ row }) => {
            const payment = row.original
       
            return (
              <MessageDetails Message={payment.message} />
            )
          },
        },

        {
          accessorKey: "date",
           header: "DateTime",
           cell: ({ row }) => {
            const payment = row.original
       
            return (
              <p className='text-sm '>{getTimestamp(new Date(payment.date))}</p>
            )
          },
        },
        
       

       
    ]
    

