'use client'

import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const ColorPicker = ({ name, form, label }) => {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center gap-2">
            {/* Color Box */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className="h-10 w-10 rounded border cursor-pointer"
                  style={{ backgroundColor: field.value }}
                  onClick={() => setOpen(true)}
                />
              </PopoverTrigger>
              <PopoverContent className="p-2">
                <SketchPicker
                  color={field.value}
                  onChange={(color) => field.onChange(color.hex)}
                />
              </PopoverContent>
            </Popover>

            {/* Hex Code Input */}
            <Input
              type="text"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="h-10"
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ColorPicker
