// UsersFormValidation
import * as Yup from 'yup'

export const UsersFormValidation = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required')
})
