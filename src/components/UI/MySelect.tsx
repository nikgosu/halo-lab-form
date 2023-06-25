import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { FormikErrors, FormikValues } from 'formik'

interface MySelectProps {
  name: string
  values: FormikValues
  errors: FormikErrors<FormikValues>
  options: any[]
  onSelectChange: (value: string) => void
}

const MySelect = ({name, values, errors, options, onSelectChange}: MySelectProps) => {

  return (
    <FormControl
      sx={{ m: 1, minWidth: 200 }}
      size="small"
    >
      <InputLabel id="demo-select-small-label">{name.charAt(0).toUpperCase() + name.slice(1)}</InputLabel>
      <Select
        value={values[name]}
        onChange={(event) => onSelectChange(event.target.value)}
        error={!!errors[name]}
      >
        {options.map(option => (
          <MenuItem
            defaultValue={''}
            value={option.name}
            key={option.name}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && <FormHelperText sx={{ color: '#d32f2f' }}>{errors[name]?.toString()}</FormHelperText>}
    </FormControl>
  );
};

export default MySelect;
