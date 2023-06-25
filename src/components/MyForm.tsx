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

const MyForm = () => {

  const { isLoading: isCitiesLoading, data: citiesResponse } = useFetchCitiesQuery()
  const { isLoading: isSpecialtiesLoading, data: specialtiesResponse } = useFetchSpecialitiesQuery()
  const { isLoading: isDoctorsLoading, data: doctorsResponse } = useFetchDoctorsQuery()
  const {setCities, setSpecialities, setDoctors, setFilteredSpecialities} = useActions()
  const {cities, doctors, filteredSpecialities} = useAppSelector(state => state.todo)
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
    },
  });

  const handleFormFieldChange = useCallback((name: string, value: string) => {
    formik.setFieldValue(name, value, true)
  }, [])

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

  return (
    <>
      {
        !isCitiesLoading && !isSpecialtiesLoading && !isDoctorsLoading &&
          <form onSubmit={formik.handleSubmit}>
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
                  onSelectChange={(value) => handleFormFieldChange('sex', value)}
              />
              <MySelect
                  name={'city'}
                  values={formik.values}
                  errors={formik.errors}
                  options={cities}
                  onSelectChange={(value) => handleFormFieldChange('city', value)}
              />
              <MySelect
                  name={'speciality'}
                  values={formik.values}
                  errors={formik.errors}
                  options={filteredSpecialities}
                  onSelectChange={(value) => handleFormFieldChange('speciality', value)}
              />
              <MySelect
                  name={'doctor'}
                  values={formik.values}
                  errors={formik.errors}
                  options={doctors}
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
              <input type="submit" />
          </form>
      }
    </>
  );
};

export default MyForm;
