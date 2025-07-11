import * as yup from 'yup'

export const ProjectValidation = yup.object().shape({
  projectName: yup.string().required('Project Name is required'),

  projectStatus: yup.string().required('Project Status is required'),
  engineer: yup.string().required('Engineer is required'),
  architecture: yup.string().required('Architecture is required'),
  projectManager: yup.string().required('Project Manager is required'),
  start_date: yup.date().required('Start date is required'),
  end_date: yup.date().required('End date is required')
})
