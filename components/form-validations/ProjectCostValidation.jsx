import * as yup from 'yup'

export const ProjectCostValidation = yup.object().shape({
  cmu: yup.string().required('CMU type is required'),
  co: yup.string().required('CO is required'),
  dk: yup.string().required('DK is required'),
  dm: yup.string().required('DM is required'),
  mc: yup.string().required('MC is required'),
  po: yup.string().required('PO is required'),
  rf: yup.string().required('RF is required'),
  rtu: yup.string().required('RTU is required'),
  sp: yup.string().required('SP is required'),
  st: yup.string().required('ST is required'),
  stl: yup.string().required('STL is required'),
  swm: yup.string().required('SWM is required'),
  td: yup.string().required('TD is required'),
  up: yup.string().required('UP is required')
})
