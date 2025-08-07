'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Input } from './input'
import { Badge } from './badge'

export interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string[]
  onChange: (value: string[]) => void
}

export function TagInput({ value, onChange, className, ...props }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault()
      if (!value?.includes(inputValue.trim())) {
        onChange([...(value || []), inputValue.trim()])
        setInputValue('')
      }
    }
  }

  const handleRemoveTag = (index: number) => {
    const newTags = [...(value || [])]
    newTags.splice(index, 1)
    onChange(newTags)
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border p-2 rounded-md min-h-[50px]">
      {(Array.isArray(value) ? value : []).map((tag, index) => (
        <Badge key={index} variant="secondary" className="flex items-center">
          {tag}
          <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(index)} />
        </Badge>
      ))}
      <Input
        {...props}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`flex-1 border-none focus-visible:ring-0 ${className}`}
      />
    </div>
  )
}
