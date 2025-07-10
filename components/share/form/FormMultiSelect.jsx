'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
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
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const FormMultiSelectField = ({
  name,
  form,
  label,
  placeholder = 'Select options',
  options,
  className
}) => {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value) ? field.value : []
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`border-color-grey h-12 w-full justify-between whitespace-normal rounded text-left font-normal !shadow-none ${className}`}
                >
                  {/* <div className='flex max-h-[100px] w-full flex-1 flex-col gap-1 overflow-y-auto pr-4 text-xs'>
                    {selectedValues.length > 0 ? (
                      options
                        ?.filter(option =>
                          selectedValues.includes(option.value)
                        )
                        .map(option => (
                          <div key={option.value}>{option.label}</div>
                        ))
                    ) : (
                      <span className='text-muted-foreground'>
                        {placeholder}
                      </span>
                    )}
                  </div> */}
                  <div className='max-h-[100px] w-full flex-1 overflow-y-auto pr-4 text-xs'>
                    {selectedValues.length > 0 ? (
                      <span>
                        {options
                          ?.filter(option =>
                            selectedValues.includes(option.value)
                          )
                          .map(option => option.label)
                          .join(', ')}
                      </span>
                    ) : (
                      <span className='text-sm text-muted-foreground'>
                        {placeholder}
                      </span>
                    )}
                  </div>

                  <ChevronDown className='ml-2 h-4 w-4 shrink-0' />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side='bottom'
                sideOffset={4}
                align='start'
                className='z-50 w-full max-w-sm p-0'
              >
                <div
                  className='max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500'
                  onWheel={e => e.stopPropagation()}
                  tabIndex={0}
                  style={{
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {options?.map(option => {
                    return (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-2 rounded p-2 ${
                          option.disabled
                            ? 'cursor-not-allowed text-gray-400'
                            : 'cursor-pointer hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          if (option.disabled) return
                          const newValue = selectedValues.includes(option.value)
                            ? selectedValues.filter(val => val !== option.value)
                            : [...selectedValues, option.value]

                          field.onChange(newValue)
                        }}
                      >
                        <Checkbox
                          checked={selectedValues.includes(option.value)}
                          disabled={option.disabled}
                        />
                        <span>{option.label}</span>
                      </div>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
            <FormDescription />
            <FormMessage>
              {typeof form?.formState?.errors[name]?.message === 'string'
                ? form?.formState?.errors[name]?.message
                : ''}
            </FormMessage>
          </FormItem>
        )
      }}
    />
  )
}

export default FormMultiSelectField
