'use client'

import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

export default function PhoneInputMask({ form, name, label }) {
  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue="+91"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputMask
              mask="+91 99999 99999"
              maskChar=""
              value={field.value}
              onChange={(e) => {
                if (!e.target.value.startsWith('+91')) return
                field.onChange(e.target.value)
              }}
              onKeyDown={(e) => {
                const caretPos = e.target.selectionStart
                const selectionLength = e.target.selectionEnd - caretPos

                if (e.key === 'Backspace' && caretPos <= 4 && selectionLength === 0) {
                  e.preventDefault()
                }

                if (e.key === 'Delete' && caretPos < 4) {
                  e.preventDefault()
                }
              }}
              onFocus={(e) => {
                setTimeout(() => {
                  if (e.target.selectionStart < 4) {
                    e.target.setSelectionRange(4, 4)
                  }
                }, 0)
              }}
              onMouseUp={(e) => {
                if (e.target.selectionStart < 4) {
                  e.target.setSelectionRange(4, 4)
                }
              }}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="tel"
                  className={cn('h-10')}
                  autoComplete="tel"
                />
              )}
            </InputMask>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
