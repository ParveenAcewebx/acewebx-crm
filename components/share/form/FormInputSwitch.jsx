"use client";

import { Controller, useFormContext } from "react-hook-form";
import ToggleOption from "./ToggleInput";

const FormInputSwitch = ({ name, label, defaultValue = false }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ToggleOption
          label={label}
          name={name}
          checked={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default FormInputSwitch;
