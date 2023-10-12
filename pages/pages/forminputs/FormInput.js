import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";

import React from "react";
import { Controller } from "react-hook-form";

export default function FormInput({
  name,
  control,
  label,
  required,
  inputType,
  className,
  defaultValue,
 
}) {
  return (
    <>
      <div className={className || ""}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue ? defaultValue : ""}
          render={({ field }) => (
            <Form.Control
              InputLabelProps={{ shrink: true }}
              {...field}
              required={required}
              className={className}
              fullWidth
              label={label}
              type={inputType}
              variant="outlined"
            />
          )}
        />
      </div>
    </>
  );
}
