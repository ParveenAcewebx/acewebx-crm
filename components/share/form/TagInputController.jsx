'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { TagInput } from '@/components/ui/tag-input'


const TagInputController = ({
  name,
  form,
  label,
  className,
  placeholder = 'Enter values...',
  disabled = false,
  onChange
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <TagInput
              value={field.value || []}
              onChange={(value) => {
                field.onChange(value)
                onChange?.(value)
              }}
              placeholder={placeholder}
              className={`border ${fieldState.error ? 'border-red-500' : ''} ${className}`}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default TagInputController
