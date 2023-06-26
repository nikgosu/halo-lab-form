import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormik } from 'formik'
import MySelect from './UI/MySelect'
import { useFetchCitiesQuery, useFetchDoctorsQuery, useFetchSpecialitiesQuery } from '../store/todo.api/todo.api'
import { SEX_OPTIONS } from '../consts'
import { VALIDATION_SCHEMA } from '../schema'
import MyInput from './UI/MyInput'
import MyDatePicker from './UI/MyDatePicker'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { Button, CircularProgress, Container } from '@mui/material'

const MyForm = () => {

  const { isLoading: isCitiesLoading, data: citiesResponse } = useFetchCitiesQuery()
  const { isLoading: isSpecialtiesLoading, data: specialtiesResponse } = useFetchSpecialitiesQuery()
  const { isLoading: isDoctorsLoading, data: doctorsResponse } = useFetchDoctorsQuery()
  const { setCities, setSpecialities, setDoctors, setFilteredSpecialities, setFilteredDoctors } = useActions()
  const { cities, specialities, doctors, filteredSpecialities, filteredDoctors } = useAppSelector(state => state.todo)
  const sexOptions = useMemo(() => SEX_OPTIONS, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      date: new Date(),
      sex: '',
      city: '',
      speciality: '',
      doctor: '',
      email: '',
      phone: ''
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const handleFormFieldChange = useCallback((name: string, value: string) => {
    formik.setFieldValue(name, value, true)
    name === 'date' && formik.setTouched({ ...formik.touched, date: true })
  }, [])

  const setFieldByDoctor = () => {
    if (!formik.values.city && formik.values.doctor) {
      const doctorObject = doctors.find(doctor => doctor.name === formik.values.doctor)
      const cityObject = cities.find(city => city.id === doctorObject?.cityId)
      if (cityObject) {
        handleFormFieldChange('city', cityObject.name)
      }
    }
    if (!formik.values.speciality && formik.values.doctor) {
      const doctorObject = doctors.find(doctor => doctor.name === formik.values.doctor)
      const specialityObject = specialities.find(speciality => speciality.id === doctorObject?.specialityId)
      if (specialityObject) {
        handleFormFieldChange('speciality', specialityObject.name)
      }
    }
  }

  useEffect(() => {
    citiesResponse && setCities(citiesResponse)
    specialtiesResponse && setSpecialities(specialtiesResponse)
    doctorsResponse && setDoctors(doctorsResponse)
  }, [citiesResponse, specialtiesResponse, doctorsResponse])

  useEffect(() => {
    setFilteredSpecialities({
      birthdayDate: formik.values.date,
      sex: formik.values.sex
    })
  }, [formik.values.sex, formik.values.date])

  useEffect(() => {
    setFilteredDoctors({
      birthdayDate: formik.values.date,
      sex: formik.values.sex,
      city: formik.values.city,
      speciality: formik.values.speciality
    })
    formik.values.city && formik.setErrors({ ...formik.errors, city: ''})
  }, [formik.values.sex, formik.values.date, formik.values.speciality, formik.values.city])

  useEffect(() => {
    setFieldByDoctor()
  }, [formik.values.doctor])

  return (
    <>
      {
        !isCitiesLoading && !isSpecialtiesLoading && !isDoctorsLoading ?
          <form onSubmit={formik.handleSubmit}>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                mt: 4,
                mb: 4,
                width: { xs: 400, md: 600, lg: 800, xl: 800 },
                minHeight: 'calc(100dvh - 150px)'
              }}
            >
              <>
                <MyInput
                  name={'name'}
                  values={formik.values}
                  errors={formik.errors}
                  onInputChange={(value) => handleFormFieldChange('name', value)}
                />
                <MyDatePicker
                  name={'date'}
                  values={formik.values}
                  errors={formik.errors}
                  onInputChange={(value) => handleFormFieldChange('date', value)}
                />
                <MySelect
                  name={'sex'}
                  values={formik.values}
                  errors={formik.errors}
                  options={sexOptions}
                  isDisabled={false}
                  onSelectChange={(value) => handleFormFieldChange('sex', value)}
                />
                <MySelect
                  name={'city'}
                  values={formik.values}
                  errors={formik.errors}
                  options={cities}
                  isDisabled={false}
                  onSelectChange={(value) => handleFormFieldChange('city', value)}
                />
                <MySelect
                  name={'speciality'}
                  values={formik.values}
                  errors={formik.errors}
                  options={filteredSpecialities}
                  isDisabled={!formik.touched.date}
                  onSelectChange={(value) => handleFormFieldChange('speciality', value)}
                />
                <MySelect
                  name={'doctor'}
                  values={formik.values}
                  errors={formik.errors}
                  options={filteredDoctors}
                  isDisabled={!formik.touched.date}
                  onSelectChange={(value) => handleFormFieldChange('doctor', value)}
                />
                <MyInput
                  name={'email'}
                  values={formik.values}
                  errors={formik.errors}
                  onInputChange={(value) => handleFormFieldChange('email', value)}
                />
                <MyInput
                  name={'phone'}
                  values={formik.values}
                  errors={formik.errors}
                  onInputChange={(value) => handleFormFieldChange('phone', value)}
                />
                <Button
                  sx={{
                    width: 'min-content',
                    ml: 'auto'
                  }}
                  variant="contained"
                  onClick={() => formik.handleSubmit()}
                >Submit</Button>
              </>
            </Container>
          </form>
          :
          <CircularProgress
            size={200}
            sx={{ mt: 'calc((100dvh / 2) - 150px)' }}
          />
      }
    </>
  );
};

export default MyForm;
