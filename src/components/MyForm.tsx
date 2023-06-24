import React, { useEffect } from 'react';
import * as yup from 'yup';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useFormik } from 'formik'
import MySelect from './UI/MySelect'
import { useFetchCitiesQuery } from '../store/todo.api/todo.api'
import { SEX_OPTIONS } from '../consts'
import { VALIDATION_SCHEMA } from '../schema'
import MyInput from './UI/MyInput'

const MyForm = () => {

  const { data: cities } = useFetchCitiesQuery()



  const formik = useFormik({
    initialValues: {
      name: '',
      date: new Date(),
      sex: '',
      city: ''
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleFormFieldChange = (name: string, value: string) => {
    formik.setFieldValue(name, value, false)
    formik.setErrors({...formik.errors, [name]: ''})
    setTimeout(() => {
      formik.validateField(name)
    }, 0)
  }



  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={ Boolean(formik.errors.name)}
        helperText={formik.errors.name}
      />
      <MyInput
        name={'name'}
        values={formik.values}
        errors={formik.errors}
        onInputChange={(value) => handleFormFieldChange('name', value)}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture={true}
          format="dd/MM/yyyy"
          label="Birthday date"
          value={formik.values.date}
          onChange={(value) => formik.setFieldValue('date', value, true)}
          slotProps={{
            textField: {
              fullWidth: false,
              variant: 'outlined',
              error: formik.touched.date && Boolean(formik.errors.date),
              helperText: (formik.touched.date && formik.errors.date) ? <>{formik.errors.date}</> : null,
            },
          }}
        />
      </LocalizationProvider>
      <MySelect
        name={'sex'}
        values={formik.values}
        errors={formik.errors}
        options={SEX_OPTIONS}
        onSelectChange={(value) => handleFormFieldChange('sex', value)}
      />
      <FormControl
        sx={{ m: 1, minWidth: 200 }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">Sex</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={formik.values.sex}
          label="Sex"
          onChange={(event) => {
            formik.setFieldValue('sex', event.target.value, false)
            formik.setErrors({...formik.errors, sex: ''})
          }}
          error={!!formik.errors.sex}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
        <FormHelperText sx={{color: '#d32f2f'}}>{formik.errors.sex}</FormHelperText>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 200 }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">City</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={formik.values.city}
          label="City"
          onChange={(event) => {
            formik.setFieldValue('city', event.target.value, false)
            formik.setErrors({...formik.errors, city: ''})
          }}
          error={!!formik.errors.city}
        >
          <MenuItem value={'Odessa'}>Odessa</MenuItem>
          <MenuItem value={'Kyiv'}>Kyiv</MenuItem>
        </Select>
        {formik.errors.city && <FormHelperText sx={{ color: '#d32f2f' }}>{formik.errors.city}</FormHelperText>}
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">Age</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={10}
          label="Specialities"
          onChange={() => {
            console.log(1233)
          }}
        >
          <MenuItem value={10}>LOR</MenuItem>
          <MenuItem value={20}>SADDS</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120 }}
        size="small"
      >
        <InputLabel id="demo-select-small-label">Age</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={10}
          label="Specialities"
          onChange={() => {
            console.log(1233)
          }}
        >
          <MenuItem value={10}>LOR</MenuItem>
          <MenuItem value={20}>SADDS</MenuItem>
        </Select>
      </FormControl>
      <input type="submit" />
    </form>
  );
};

export default MyForm;
