import * as yup from 'yup'

export const TermsCodesSchema = yup.object().shape({
  code: yup.string().required('Code is required'),
})

