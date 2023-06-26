import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { FormikErrors, FormikValues } from 'formik'

interface MyDatePickerProps {
  name: string
  values: FormikValues
  errors: FormikErrors<FormikValues>
  onInputChange: (value: string) => void
}

const MyDatePicker = ({ name, values, errors, onInputChange }: MyDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture={true}
        format="dd/MM/yyyy"
        label="Birthday date"
        value={values.date}
        sx={{minHeight: 90}}
        onChange={(value) => onInputChange(value)}
        slotProps={{
          textField: {
            fullWidth: false,
            variant: 'outlined',
            error: Boolean(errors[name]),
            helperText: (errors[name]) ? <>{errors[name]}</> : null,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
