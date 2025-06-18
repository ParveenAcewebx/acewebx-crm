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
              InputLabelProps={{ shrink: true }}
              {...field}
              className={className}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
              label={label}
              type={inputType}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              variant="outlined"
            />
          )}
        />
      </FormControl>
    </div>
  );
}