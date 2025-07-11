'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  FormControl,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  Check,
  ChevronsUpDown,
  ExternalLink,
  Eye,
  EyeClosed,
  Plus
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SelectFilterCover = ({
  leadId,
  name,
  form,
  onChange,
  placeholder,
  label,
  options = [],
  disabled,
  className,
  handleHideShow,
  hideShow = {}
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    'h-12 w-full justify-between rounded border',
                    fieldState.invalid && 'border-red-500',
                    !field.value && 'text-muted-foreground',
                    className
                  )}
                >
                  {field.value
                    ? options.find(opt => opt.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className='w-[600px] p-0'>
              <Command>
                <CommandInput placeholder='Search ...' className='h-9' />
                <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup>
                    {options.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.label?.toLowerCase()}
                        className='flex cursor-pointer items-center justify-between'
                        onSelect={() => {
                          form.setValue(name, item.value, {
                            shouldValidate: true
                          })
                          setOpen(false)
                        }}
                      >
                        <div className='flex items-center gap-2'>
                          <span>{item.label}</span>
                          <Check
                            className={cn(
                              'h-4 w-4 text-primary',
                              item.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </div>

                        <div className='flex gap-2'>
                          {/* View Revision */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className='rounded p-1 hover:bg-gray-200'
                                onClick={e => {
                                  e.stopPropagation()
                                  router.push(
                                    `/dashboard/budget-book/cover-preview?id=${item.value}`
                                  )
                                }}
                              >
                                <ExternalLink className='h-6 w-6 cursor-pointer text-blue-500 hover:text-primary' />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Revision</p>
                            </TooltipContent>
                          </Tooltip>

                          {/* Reset Selection */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className='rounded p-1 hover:bg-gray-200'
                                onClick={
                                  hideShow?.[item.value]
                                    ? e => {
                                        e.stopPropagation()
                                        onChange?.(item.value)
                                      }
                                    : undefined
                                }
                              >
                                <Plus className='h-6 w-6 cursor-pointer text-gray-500 hover:text-primary' />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {hideShow?.[item.value]
                                  ? 'Reset Revision'
                                  : 'Cannot reset while the revision is hidden.'}
                              </p>
                            </TooltipContent>
                          </Tooltip>

                          {/* Toggle Hide/Show */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className='rounded p-1 hover:bg-gray-200'
                                onClick={e => {
                                  e.stopPropagation()
                                  handleHideShow?.(item)
                                }}
                              >
                                {hideShow?.[item.value] ? (
                                  <Eye className='h-6 w-6 text-green-500 hover:text-primary' />
                                ) : (
                                  <EyeClosed className='h-6 w-6 text-red-500 hover:text-primary' />
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{hideShow?.[item.value] ? 'Hide' : 'Show'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectFilterCover
