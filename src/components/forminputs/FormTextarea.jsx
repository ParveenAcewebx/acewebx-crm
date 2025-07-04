import { Controller } from 'react-hook-form'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

export default function FormTextarea({
  name,
  errors,
  control,
  label,
  className,
  defaultValue,
  minRows = 3,
  style = { width: '100%' }
}) {
  return (
    <FormControl fullWidth className={className} error={!!errors?.[name]}>
      {/* {label && <InputLabel shrink>{label}</InputLabel>} */}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ''}
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            label={label}
            minRows={minRows}
            aria-label='minimum height'
            placeholder={label}
            style={style}
            className={className}
          />
        )}
      />

      {!!errors?.[name] && <FormHelperText >{errors[name].message}</FormHelperText>}
    </FormControl>
  )
}
