import { FormControl, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function FormInput({
  name,
  errors,
  control,
  label,
  inputType,
  min,
  className,
  defaultValue,
  value,
  color
}) {
  const hasError = !!errors?.[name];

  return (
    <FormControl fullWidth className={className} error={hasError}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type={inputType || "text"}
            label={label}
            error={hasError}
            InputProps={{
              inputProps: { min: min || 0 },
            }}
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
      />
      {hasError && (
        <FormHelperText sx={{ color: '#f44336', fontSize: '0.8rem' }}>
          {errors[name]?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
