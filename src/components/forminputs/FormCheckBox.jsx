import React from "react";
import { Controller } from "react-hook-form";

const CheckboxGroup = ({ name, options, control }) => {
  return (
    <div>
      {options.map((option, index) => {
        return (
          <label key={option.value}>
            <Controller
              name={`${name}`}
              //   name={`${name}.${option.value}`}    // for multiple value send
              control={control}
              defaultValue={index === 0 ? true : false}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value} // Set the checked attribute based on the field value
                  value={option.value}
                />
              )}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
