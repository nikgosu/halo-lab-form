import React from 'react';
import { FormControl, MenuItem, TextField } from '@mui/material'
import { FormikErrors, FormikValues } from 'formik'

interface MySelectProps {
  name: string
  values: FormikValues
  errors: FormikErrors<FormikValues>
  options: any[]
  isDisabled: boolean
  onSelectChange: (value: string) => void
}

const MySelect = ({ name, values, errors, options, isDisabled, onSelectChange }: MySelectProps) => {
  return (
    <>
      {
        options &&
          <FormControl
              sx={{ minWidth: 200, minHeight: 90 }}
              size="medium"
          >
            <TextField
              select
              label={name.charAt(0).toUpperCase() + name.slice(1)}
              value={values[name] && values[name].name ? values[name] : ''}
              onChange={(event) => onSelectChange(event.target.value)}
              variant="outlined"
              defaultValue={''}
              error={!!Object.keys(errors[name] ?? {}).length}
              helperText={isDisabled ? 'You have to pick birthday date' : !!Object.keys(errors[name] ?? {}).length ? ((errors[name] as any)?.name) : ''}
              disabled={isDisabled}
              sx={{
                '.MuiSelect-select': {
                  textAlign: 'start'
                }
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  defaultValue={''}
                  value={option.name ? option : ''}
                  key={option.name + index}
                >
                  {option.name} {option.surname ? option.surname : ''}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
      }
    </>
  );
};

export default MySelect;
