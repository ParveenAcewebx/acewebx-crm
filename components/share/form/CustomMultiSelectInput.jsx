'use client'

import { FormLabel } from '@/components/ui/form'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

const CreatableMultiSelect = ({ name, label, options }) => {
  const { control } = useFormContext()
  const [inputValue, setInputValue] = useState('')
  const [collapsed, setCollapsed] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const wrapperRef = useRef(null)
  const valueContainerRef = useRef(null)
  const inputRef = useRef(null)

  const formattedOptions = options.map(item => ({
    value: item,
    label: item
  }))

  const setHeight = isCollapsed => {
    if (valueContainerRef.current) {
      valueContainerRef.current.style.height = isCollapsed ? '40px' : 'auto'
    }
    setCollapsed(isCollapsed)
  }

  // Collapse on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        // Blur input to remove focus and blue border
        if (inputRef.current) {
          inputRef.current.blur()
        }
        setHeight(true)
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <FormLabel className='mb-4'>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ field }) => {
          const selectedWithLabel = field.value.map(item => ({
            value: item.value,
            label: item.label || item.value
          }))

          return (
            <CreatableSelect
              {...field}
              isMulti
              options={formattedOptions}
              placeholder='Select or type to add...'
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              value={selectedWithLabel}
              inputValue={inputValue}
              onInputChange={val => {
                setInputValue(val)
                setHeight(false)
                setMenuOpen(true)
              }}
              onMenuOpen={() => {
                setMenuOpen(true)
                setHeight(false)
              }}
              onMenuClose={() => {
                setMenuOpen(false)
                setHeight(true)
              }}
              className='react-select-container mt-2'
              classNamePrefix='react-select'
              noOptionsMessage={() => null}
              isClearable={false}
              onFocus={() => {
                setHeight(false)
                setMenuOpen(true)
              }}
              onBlur={() => {
                setHeight(true)
                setMenuOpen(false)
              }}
              onChange={selected => {
                const withLabel = selected?.map(item => ({
                  value: item.value,
                  label: item.label || item.value
                }))
                field.onChange(withLabel)
              }}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => (
                  <div
                    onMouseDown={e => {
                      e.stopPropagation()
                      e.preventDefault()
                      setHeight(!collapsed)
                      setMenuOpen(!collapsed)
                      // Blur input when collapsing
                      if (!collapsed && inputRef.current) {
                        inputRef.current.blur()
                      }
                    }}
                    className='cursor-pointer'
                  >
                    {collapsed ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )}
                  </div>
                )
              }}
              styles={{
                valueContainer: base => ({
                  ...base,
                  height: collapsed ? '40px' : 'auto',
                  overflowY: 'auto',
                  transition: 'height 0.2s ease'
                }),
                control: base => ({
                  ...base,
                  boxShadow: 'none',
                  '&:focus-within': {
                    borderColor: 'inherit',
                    boxShadow: 'none'
                  }
                })
              }}
              ref={selectRef => {
                const container = selectRef?.controlRef?.querySelector(
                  '.react-select__value-container'
                )
                const input = selectRef?.inputRef
                if (container) valueContainerRef.current = container
                if (input) inputRef.current = input
              }}
            />
          )
        }}
      />
    </div>
  )
}

export default CreatableMultiSelect
