import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormControl, InputAdornment } from '@mui/material'
import dayjs from 'dayjs'
const FormMobileDatePicker = ({ name, control, label, inputFormat, defaultValue, errors, value, className }) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)
  return (
    <>
      <div>
        <FormControl fullWidth>
          <Controller
            name={name}
            control={control}
            value={value}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  inputFormat={inputFormat}
                  label={label}
                  open={isDatePickerOpen}
                  onOpen={() => setDatePickerOpen(true)} // <== Add this
                  onClose={() => setDatePickerOpen(false)}
                  value={value ? value : null}
                  onChange={newValue => {
                    onChange(newValue || value)
                    setDatePickerOpen(false)
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      onClick={() => setDatePickerOpen(true)} // <== Add this to allow input click to open picker
                      error={!!errors?.[name]}
                      helperText={errors?.[name]?.message}
                      className={className}
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position='end'>
                            <DateRangeIcon
                              className='cursor-pointer'
                              onClick={e => {
                                e.stopPropagation() // Prevent bubbling to input
                                setDatePickerOpen(true)
                              }}
                            />
                          </InputAdornment>
                        )
                      }}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </FormControl>
      </div>
    </>
  )
}
export default FormMobileDatePicker
