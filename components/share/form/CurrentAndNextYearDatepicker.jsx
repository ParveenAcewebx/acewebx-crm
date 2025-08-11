'use client'

import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

const CurrentAndNextYearDatepicker = ({
  name,
  control,
  label,
  placeholder,
  className,
  disabled,
  defaultMonth
}) => {
  const [open, setOpen] = useState(false)

  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined

        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    style={{ borderRadius: '0.25rem !important' }}
                    onClick={() => setOpen(prev => !prev)}
                    className={`h-12 w-full justify-between font-normal ${
                      !field.value ? 'text-muted-foreground' : ''
                    } ${fieldState.error ? 'border-red-500' : ''} ${className}`}
                  >
                    {selectedDate && !isNaN(selectedDate.getTime())
                      ? format(selectedDate, 'MM/dd/yyyy')
                      : placeholder || 'Select date'}
                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto rounded-lg border border-gray-200 bg-white p-0 shadow-lg"
                align="start"
              >
                <Calendar
                  className="rounded-md bg-white p-3"
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    field.onChange(date)
                    setOpen(false)
                  }}
                  captionLayout="dropdown"
                  fromYear={currentYear}
                  toYear={nextYear}
                  disabled={(date) => {
                    const year = date.getFullYear()
                    return year < currentYear || year > nextYear
                  }}
                  defaultMonth={selectedDate || defaultMonth || new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default CurrentAndNextYearDatepicker
