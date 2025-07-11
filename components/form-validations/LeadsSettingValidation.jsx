import * as yup from 'yup'

export const LeadsSettingFormSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  color: yup.string().required('Color is required'),
})

export const LeadsSettingInteracationFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
})
