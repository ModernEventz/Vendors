
"use client"

import * as React from "react"
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


import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { setTotalOrders } from "@/lib/Store/slice";
import {  useDispatch } from 'react-redux'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import AddBudget from "@/components/AddBudget"
import MessageDetails from "@/components/MessageDetails"
import DeleteBudget from "@/components/DeleteBudget"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

 
  
export function DataTable<TData, TValue>({
  
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const dispatch = useDispatch()

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
    






  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const calculateTotalCost = () => {
    const allRows = table.getRowModel().rows;
    const totalCost = allRows.reduce((acc, row) => {
      const cost = parseFloat(row.getValue("cost"));
      return acc + (isNaN(cost) ? 0 : cost);
    }, 0);
  
    dispatch(setTotalOrders(totalCost));
    return totalCost;
  };
  


  return (
    <div >
    <div>
      <p className="text-lg text-slate-900 dark:text-slate-50">Ordrers</p>
      <p className="text-sm font-medium text-slate-400">Manage your Orders</p>
    </div>
    <div className="flex flex-col justify-between py-4 sm:flex-row">
      <Input
        placeholder="Filter items..."
        value={table.getColumn("item")?.getFilterValue() as string}
        onChange={(event) =>
          table.getColumn("item")?.setFilterValue(event.target.value)
        }
        
      />
     
    </div>
    <div >
      <Table className="rounded-md border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="text-muted-foreground flex-1 text-sm">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
      <span className="block sm:inline-block mt-2 sm:mt-0 sm:float-right text-lg text-slate-900 dark:text-slate-50">
        Total Orders: {calculateTotalCost() }
      </span>
    </div>
  </div>
  
  )
}
