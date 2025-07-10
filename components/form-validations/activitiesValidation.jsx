import * as yup from 'yup'

export const ActivitiesValidation = yup.object().shape({
  interaction_type_id: yup.string().required('Interaction type is required'),
  contact_id: yup.string().required('Contact is required'),
  date: yup.string().required('Date is required')
})
