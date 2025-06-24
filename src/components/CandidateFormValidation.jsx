import * as Yup from 'yup'

export const CandidateFormValidation = Yup.object().shape({
  name: Yup.string()
    .required('Full Name is required')
    .min(3, 'Minimum 3 characters are required')
    .max(50, 'Maximum 50 characters allowed'),

  email: Yup.string().email('Please enter a valid email').required('Email is required'),

  dob: Yup.date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future'),

  gender: Yup.string().required('Gender is required'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{6,15}$/, 'Phone number must be between 6 and 15 digits'),

  currentLocation: Yup.string().required('Current Location is required'),

  designationApplyingFor: Yup.string().required('Designation is required'),

  totalExperience: Yup.number()
    .typeError('Total Experience must be a number')
    .required('Total Experience is required')
    .min(0, 'Experience must be at least 0 years')
    .max(50, 'Experience must be realistic'),

  currentSalary: Yup.number().typeError('Current Salary must be a number').required('Current Salary is required'),

  expectedSalary: Yup.number().typeError('Expected Salary must be a number').required('Expected Salary is required'),

  currentCompanyName: Yup.string().required('Company name is required'),

  noticePeriod: Yup.string().required('Notice Period is required'),

  reasonForChange: Yup.string().required('Reason for Change is required'),

  preferredShift: Yup.string().required('Preferred Shift is required'),

  source: Yup.string().required('Source is required'),

  resume: Yup.string().required('Resume is required'),

  reference1Name: Yup.string().required('Reference 1 Name is required'),

  reference1ContactNumber: Yup.string()
    .required('Reference 1 Contact Number is required')
    .matches(/^[0-9]{6,15}$/, 'Contact number must be between 6 and 15 digits'),

  reference1Designation: Yup.string().required('Reference 1 Designation is required'),

  reference1Experience: Yup.number()
    .typeError('Reference 1 Experience must be a number')
    .required('Reference 1 Experience is required')
    .min(0, 'Experience must be at least 0'),
  reference2Name: Yup.string().required('Reference 2 Name is required'),

  reference2ContactNumber: Yup.string()
    .required('Reference 2 Contact Number is required')
    .matches(/^[0-9]{6,15}$/, 'Contact number must be between 6 and 15 digits'),

  reference2Designation: Yup.string().required('Reference 2 Designation is required'),

  reference2Experience: Yup.number()
    .typeError('Reference 2 Experience must be a number')
    .required('Reference 2 Experience is required')
    .min(0, 'Experience must be at least 0')
})
