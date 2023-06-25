import * as yup from 'yup'

export const VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zа-яёA-ZА-ЯЁ\s]+$/, 'Name must content only letters')
    .required('Name is required'),
  date: yup
    .date()
    .max(new Date(), 'Date of birth must be in the past')
    .required('Birthday date is required'),
  sex: yup
    .string()
    .required('Sex is required'),
  city: yup
    .string()
    .required('City is required'),
  speciality: yup
    .string(),
  doctor: yup
    .string()
    .required('Doctor is required'),
  phone: yup
    .string()
    .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Phone number is not valid')
    .when('email', {
      is: (val: string) => !val,
      then: (schema) =>
        schema.required('Email or phone number is required')
    }),
  email: yup
    .string()
    .email('Email is not valid')
    .when('phone', {
      is: (val: string) => !val,
      then: (schema) =>
        schema.required('Email or phone number is required')
    })
  },
  [ [ 'email', 'phone' ] ]
);
