import * as yup from 'yup'

export const CompanySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  companyType: yup.string().required('Company type is required'),
  address: yup.string().required('Address is required'),
  companyNotes: yup.string().required('Company notes is required'),
  companyLeadScore: yup.string().required('Company lead score is required'),
  address: yup.string().required('Address is required')
})
export const CompanyTypeSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  backgroundColor: yup.string().required('Background color is required')
  // sortOrder: yup.string().required('Sort order is required')
})
