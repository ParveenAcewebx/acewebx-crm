import * as yup from 'yup'

export const MaterialValidation = yup.object().shape({
  item: yup.string().required('Item is required'),
  description: yup.string().required('Description To is required'),
  cost: yup.string().required('Cost To is required'),
  qty: yup.string().required('Pack Qty To is required'),
  total: yup.string().required('Cost Each To is required'),
  hardware_type: yup.string().required('Hardware Type To is required'),
  brand: yup.string().required('Brand To is required')
})
