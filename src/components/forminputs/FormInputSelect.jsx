import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
  name,
  control,
  label,
  options,
  errors,
  defaultValue,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""} // Updated defaultValue handling
        render={({ field }) => (
          <Select
            label={label}
            id={name}
            {...field}
            error={!!errors?.[name]}
            className="shadow-lg"
          >
            {options?.map((option) => (
              <MenuItem
                className="capitalize"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      {errors?.[name] && (
        <p className="text-red-600 text-xs">{errors[name]?.message}</p>
      )}
    </FormControl>
  );
};

export default FormInputSelect;
