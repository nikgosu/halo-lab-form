import React from 'react';
import { TextField, Typography } from '@mui/material'
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
      sx={{ minHeight: 90 }}
      onChange={(event) => onInputChange(event.target.value)}
      error={Boolean(errors[name])}
      helperText={errors[name] && <Typography
          component={'span'}
          sx={{ color: '#d32f2f', fontSize: 12 }}
      >{errors[name]?.toString()}</Typography>}
    />
  );
};

export default MyInput;
