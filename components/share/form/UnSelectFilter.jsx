'use client'
import { Button } from '@/components/ui/button'
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from '@/components/ui/command'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { debounce } from 'lodash'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const UnSelectFilter = ({
  name,
  form,
  placeholder,
  label,
  options,
  disabled,
  className,
  onSearch,
  fetchValueById,
  defaultId
}) => {
  const [open, setOpen] = useState(false)
  const [searchOptions, setSearchOptions] = useState(options || [])

  // keep searchOptions in sync with incoming options
  useEffect(() => {
    setSearchOptions(options ?? [])
  }, [options])


  const watchedValue = form?.watch?.(name)
  const normalize = v => (v === undefined || v === null ? '' : String(v))

  useEffect(() => {
    let cancelled = false

    const currentValue = normalize(defaultId ?? watchedValue)
    if (!currentValue) return
    if (!fetchValueById) return

    const existsInSearch =
      searchOptions?.some(o => normalize(o.value) === currentValue)
    const existsInOptions =
      (options ?? [])?.some(o => normalize(o.value) === currentValue)
    if (existsInSearch || existsInOptions) return

    ;(async () => {
      try {
        const item = await fetchValueById(currentValue)
        if (cancelled) return

        const newOption = {
          label: item?.label ?? `Value ${currentValue}`,
          value: normalize(item?.value ?? currentValue),
        }

        // append only if missing
        setSearchOptions(prev => {
          const has = prev.some(o => normalize(o.value) === newOption.value)
          return has ? prev : [...prev, newOption]
        })

        // ensure form has normalized value
        if (normalize(watchedValue) !== newOption.value) {
          form?.setValue(name, newOption.value, { shouldValidate: true })
        }
      } catch (err) {
        if (cancelled) return
        const fallback = { label: currentValue, value: currentValue }
        setSearchOptions(prev => {
          const has = prev.some(o => normalize(o.value) === currentValue)
          return has ? prev : [...prev, fallback]
        })
        if (normalize(watchedValue) !== currentValue) {
          form?.setValue(name, currentValue, { shouldValidate: true })
        }
      }
    })()

    return () => { cancelled = true }
    //  include watchedValue so it re-runs when value is filled later
  }, [defaultId, watchedValue, fetchValueById, name, options, searchOptions, form])

 
 
  const handleSearch = debounce(async value => {
    if (!value || value?.length < 3) return

    if (onSearch) {
      const newOptions = await onSearch(value)
      if (Array.isArray(newOptions)) {
        setSearchOptions(newOptions)
      }
    }
  }, 300)

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
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
                    ? (searchOptions?.find(it => normalize(it.value) === normalize(field.value))?.label ?? placeholder)
                    : placeholder}
                  <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-[600px] p-0'>
              <Command>
                <CommandInput placeholder='Search ...' className='h-9' onValueChange={handleSearch} />
                <CommandList>
                  <CommandEmpty>No Item found.</CommandEmpty>
                  <CommandGroup>
                    {searchOptions?.map(item => (
                      <CommandItem
                        key={normalize(item.value)}
                        value={typeof item?.label === 'string' ? item.label.toLowerCase() : ''}
                        onSelect={() => {
                          const isSelected = normalize(field.value) === normalize(item.value)
                          form?.setValue(name, isSelected ? '' : normalize(item.value), { shouldValidate: true })
                          setSearchOptions(prev => {
                            const exists = prev.some(opt => normalize(opt.value) === normalize(item.value))
                            return exists ? prev : [...prev, item]
                          })
                          setOpen(false)
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            normalize(item.value) === normalize(field.value) ? 'opacity-100' : 'opacity-0'
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

export default UnSelectFilter
