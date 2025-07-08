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
    <FormControl fullWidth  error={hasError}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || '+91 '}
        render={({ field }) =>
          isPhone ? (
            <InputMask
              {...field}
              className={className}
              mask="+91 99999 99999"
              maskChar=""
              value={field.value || '+91 '}
              onChange={(e) => {
                if (!e.target.value.startsWith('+91')) return;
                field.onChange(e);
              }}
              onKeyDown={(e) => {
                const input = e.target;
                const caretPos = input.selectionStart;
                const selectionLength = input.selectionEnd - input.selectionStart;

                // ❌ Prevent backspace in +91 area
                if (e.key === 'Backspace' && caretPos <= 4 && selectionLength === 0) {
                  e.preventDefault();
                }

                // ❌ Prevent delete over +91
                if (e.key === 'Delete' && caretPos < 4) {
                  e.preventDefault();
                }
              }}
              onMouseUp={(e) => {
                const input = e.target;
                // ❌ Don't allow selecting into +91
                if (input.selectionStart < 4) {
                  input.setSelectionRange(4, 4);
                }
              }}
              onFocus={(e) => {
                // 🧠 Auto-place cursor after +91
                setTimeout(() => {
                  if (e.target.selectionStart < 4) {
                    e.target.setSelectionRange(4, 4);
                  }
                }, 0);
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
