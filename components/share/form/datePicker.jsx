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
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

const FormDatePicker = ({
  name,
  form,
  label,
  disabled,
  className,
  placeholder
}) => {
  const [open, setOpen] = useState(false)
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  onClick={() => setOpen(prev => !prev)}
                  className={cn(
                    `border-color-grey shadow-none', !field.value && 'text-muted-foreground h-12 w-full rounded pl-3 text-left font-normal ${className}`
                  )}
                >
                  {field?.value && !isNaN(new Date(field?.value).getTime())
                    ? format(new Date(field?.value), 'MM/dd/yy')
                    : placeholder || 'Pick a date'}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                className='bg-white !shadow-[0_0_15px_-13px_black] shadow-slate-100'
                mode='single'
                selected={field.value}
                onSelect={date => {
                  field.onChange(date)
                  setOpen(false)
                }}
                disabled={disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormDatePicker
