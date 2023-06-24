import * as yup from 'yup'

export const VALIDATION_SCHEMA = yup.object({
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
});
