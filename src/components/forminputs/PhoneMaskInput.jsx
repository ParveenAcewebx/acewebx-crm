import { FormControl, FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

export default function PhoneMaskInput({
  name,
  errors,
  control,
  label,
  inputType,
  className,
  defaultValue,
}) {
  const hasError = !!errors?.[name];
  const isPhone = inputType === 'tel' || inputType === 'telephone';

  return (
    <FormControl fullWidth className={className} error={hasError}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || '+91 '}
        render={({ field }) =>
          isPhone ? (
            <InputMask
              {...field}
              mask="+91 99999 99999"
              maskChar=""
              value={field.value || '+91 '}
              onChange={(e) => {
                // Prevent user from deleting "+91"
                if (!e.target.value.startsWith('+91')) return;
                field.onChange(e);
              }}
              onKeyDown={(e) => {
                const input = e.target;
                const caretPos = input.selectionStart;

                // Prevent backspace in the "+91 " area (first 4 chars)
                if (
                  e.key === 'Backspace' &&
                  caretPos !== null &&
                  caretPos <= 4
                ) {
                  e.preventDefault();
                }
              }}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  fullWidth
                  label={label}
                  error={hasError}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#333333',
                      '& fieldset': {
                        borderColor: hasError ? '#f44336' : '#333333',
                        borderWidth: '1px',
                      },
                      '&:hover fieldset': {
                        borderColor: hasError ? '#f44336' : '#333333',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: hasError ? '#f44336' : '#333333',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: hasError ? '#f44336' : '#666666',
                      '&.Mui-focused': {
                        color: hasError ? '#f44336' : '#333333',
                      },
                    },
                  }}
                />
              )}
            </InputMask>
          ) : (
            <TextField
              {...field}
              fullWidth
              type={inputType || 'text'}
              label={label}
              error={hasError}
            />
          )
        }
      />
      {hasError && (
        <FormHelperText sx={{ color: '#f44336', fontSize: '0.8rem' }}>
          {errors[name]?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
