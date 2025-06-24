import React, { useEffect, useState } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelectAutoComplete = ({
  name,
  control,
  label,
  options,
  errors = {},
  handleChange,
  className,
  inputValueCheck,
}) => {
  const [inputValue, setInputValue] = useState("");

  const getOptionLabel = (option) => {
    return typeof option === "string" ? option : option.label;
  };

  const filterOptions = (options, { inputValue }) => {
    const inputValueLowerCase = inputValue.toLowerCase();

    if (!inputValueLowerCase) {
      return options;
    }

    const exactMatches = [];
    const startsWithMatches = [];
    const partialMatches = [];

    options.forEach((option) => {
      const label = getOptionLabel(option).toLowerCase();
      if (label === inputValueLowerCase) {
        exactMatches.push(option);
      } else if (label.startsWith(inputValueLowerCase)) {
        startsWithMatches.push(option);
      } else if (label.includes(inputValueLowerCase)) {
        partialMatches.push(option);
      }
    });

    return [...exactMatches, ...startsWithMatches, ...partialMatches];
  };


  useEffect(()=>{
if(inputValueCheck === true){
  setInputValue("")
}
  },[inputValueCheck])
  
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        className={className}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            inputValue={inputValue}
            options={options}
            value={field.value}
            onChange={(_, value) => {
              handleChange(value);
              field.onChange(value); // Clear the error when the value changes
            }}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              />
            )}
            getOptionLabel={getOptionLabel}
            filterOptions={filterOptions}
            freeSolo
          />
        )}
      />
    </FormControl>
  );
};

export default FormInputSelectAutoComplete;
