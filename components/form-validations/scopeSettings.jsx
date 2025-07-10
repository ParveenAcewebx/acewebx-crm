import * as yup from 'yup'

export const ScopeSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
})