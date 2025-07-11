import * as yup from 'yup'

export const pipelineSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  materialType: yup.string().required('Pipeline Type is required')
})
