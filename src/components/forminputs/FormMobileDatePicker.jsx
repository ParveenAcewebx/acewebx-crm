import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const FormDatePicker = ({
  name,
  control,
  label,
  defaultValue,
  className,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || null}
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <DatePicker
              label={label}
              value={value || null}
              onChange={onChange}
              slotProps={{
                textField: {
                  inputRef: ref,
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                  className: className,
                },
              }}
            />
          )}
        />
      </FormControl>
    </LocalizationProvider>
  )
}

export default FormDatePicker
