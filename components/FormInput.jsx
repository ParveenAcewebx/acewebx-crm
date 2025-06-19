import { FormControl } from "@mui/material";
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
  return (
    <div>
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          value={value}
          min={min}
          defaultValue={defaultValue ? defaultValue : ""}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              InputProps={{
                inputProps: { min: 0 },
              }}
              label={label}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#333333',
                  '& fieldset': {
                    borderColor: '#333333',
                    borderWidth: '1px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#333333',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#333333',
                    borderWidth: '1px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#666666',
                  '&.Mui-focused': {
                    color: '#333333',
                  },
                },
              }}
            />
          )}
        />
      </FormControl>
    </div>
  );
  
}





