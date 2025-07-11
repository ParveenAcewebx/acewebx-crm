import * as yup from 'yup'

export const InventorySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  email: yup.string().required('Email is required'),
})
