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
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

const SelectFilter = ({
  name,
  form,
  placeholder,
  label,
  options,
  disabled,
  className
}) => {
  const [open, setOpen] = useState(false)
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
                    ? options?.find(item => item?.value == field?.value)?.label
                    : placeholder}
                  <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className='w-[600px] p-0'>
              <Command>
                <CommandInput placeholder='Search ...' className='h-9' />
                <CommandList>
                  <CommandEmpty>No Item found.</CommandEmpty>
                  <CommandGroup>
                    {options?.map(item => (
                      <CommandItem
                        key={item.value}
                        // value={item.value} // changed from item.label.toLowerCase()
                        value={item?.label?.toLowerCase()}
                        onSelect={() => {
                          form.setValue(name, item.value, {
                            shouldValidate: true
                          })
                          setOpen(false)
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            item.value == field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
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

export default SelectFilter
