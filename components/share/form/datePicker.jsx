// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'
// import { format } from 'date-fns'

// import { CalendarIcon } from 'lucide-react'
// import { useState } from 'react'

// const FormDatePicker = ({
//   name,
//   form,
//   label,
//   disabled,
//   className,
//   placeholder,
//   defaultMonth
// }) => {
//   const [open, setOpen] = useState(false)
//   return (
//     <FormField
//       control={form?.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <Popover open={open} onOpenChange={setOpen}>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant='outline'
//                   onClick={() => setOpen(prev => !prev)}
//                   className={cn(
//                     `border-color-grey shadow-none', !field.value && 'text-muted-foreground h-12 w-full rounded pl-3 text-left font-normal ${className}`
//                   )}
//                 >
//                   {field?.value && !isNaN(new Date(field?.value).getTime())
//                     ? format(new Date(field?.value), 'MM/dd/yy')
//                     : placeholder || 'Pick a date'}
//                   <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className='w-auto p-0' align='start'>
//               <Calendar
//                 className='bg-white !shadow-[0_0_15px_-13px_black] shadow-slate-100'
//                 mode='single'
//                 selected={field.value}
//                 onSelect={date => {
//                   field.onChange(date)
//                   setOpen(false)
//                 }}
//                 disabled={disabled}
//                 defaultMonth={defaultMonth}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           <FormDescription />
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }

// export default FormDatePicker
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

import { cn } from '@/lib/utils'

const FormDatePicker = ({
  name,
  control,
  label,
  placeholder,
  className,
  disabled,
  defaultMonth
}) => {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  onClick={() => setOpen(prev => !prev)}
                  className={cn(
                    'h-12 w-full justify-between font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value && !isNaN(new Date(field.value).getTime())
                    ? format(new Date(field.value), 'MM/dd/yy')
                    : placeholder || 'Select date'}
                  <ChevronDownIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto rounded-lg border border-gray-200 bg-white p-0 shadow-lg'
              align='start'
            >
              <Calendar
                className='rounded-md bg-white p-3'
                mode='single'
                selected={field.value}
                onSelect={date => {
                  field.onChange(date)
                  setOpen(false)
                }}
                captionLayout='dropdown'
                fromYear={1950}
                toYear={new Date().getFullYear()}
                disabled={disabled}
                defaultMonth={defaultMonth}
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
