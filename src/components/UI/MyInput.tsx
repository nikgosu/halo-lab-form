import React from 'react';
import { FormHelperText, TextField } from '@mui/material'
import { FormikErrors, FormikValues } from 'formik'

interface MyInputProps {
  name: string
  values: FormikValues
  errors: FormikErrors<FormikValues>
  onInputChange: (value: string) => void
}

const MyInput = ({ name, values, errors, onInputChange }: MyInputProps) => {

  return (
    <TextField
      id={name}
      label={name.charAt(0).toUpperCase() + name.slice(1)}
      variant="outlined"
      value={values[name]}
      onChange={(event) => onInputChange(event.target.value)}
      error={Boolean(errors[name])}
      helperText={errors[name] && <FormHelperText sx={{ color: '#d32f2f' }}>{errors[name]?.toString()}</FormHelperText>}
    />
  );
};

export default MyInput;
