import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'

const FormInputSelect = ({ name, control, label, options, errors, defaultValue }) => {
  const hasError = !!errors?.[name]

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel
        id={`${name}-label`}
        sx={{
          color: 'black',
          '&.Mui-focused': {
            color: 'black'
          }
        }}
      >
        {label}
      </InputLabel>

      <Controller
        defaultValue={defaultValue} // 👈 Add this line
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            labelId={`${name}-label`}
            id={name}
            label={label}
            value={field.value || ''}
            {...field}
            className='shadow-lg'
            sx={{
              // Black border
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black'
              },
              // Black floating label
              '&.Mui-focused ~ label, & ~ label': {
                color: 'black'
              }
            }}
          >
            {options?.map(option => (
              <MenuItem key={option.value} value={option.value} className='capitalize'>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {hasError && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  )
}

export default FormInputSelect
