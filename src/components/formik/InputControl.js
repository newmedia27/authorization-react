import React from "react";
import { useField } from "formik";
import Input from "../shared/input/Input";

const InputControl = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = ({ target: { value } }) => {
    helpers.setValue(value);
  };
  const error = meta.error && meta.touched;
  return (
    <Input
      name={name}
      value={field.value}
      onChange={handleChange}
      {...props}
      error={error}
      errMsg={meta.error}
    />
  );
};

export default InputControl;
