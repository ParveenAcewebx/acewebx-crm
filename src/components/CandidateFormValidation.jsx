import * as Yup from 'yup'

export const CandidateFormValidation = Yup.object().shape({
  name: Yup.string()
    .required('Full Name is required')
    .min(3, 'Minimum 3 characters are required')
    .max(50, 'Maximum 50 characters allowed'),
    // dob: Yup.date()
    // .nullable()
    // .typeError('Date of Birth is required')
    // .required('Date of Birth is required'),

  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  gender: Yup.string().required('Gender is required'),

  phone: Yup.string()
  .transform(value => value.replace(/\D/g, '')) // remove all non-digits
  .required('Phone number is required')
  .matches(/^[0-9]{6,15}$/, 'Phone number must be between 6 and 15 digits'),

  currentLocation: Yup.string().required('Current Location is required'),

    designationApplyingFor: Yup.string()
      .required('Please select a designation'),

  
  totalExperience: Yup.string().required('Total Experience is required'),

  currentSalary: Yup.number().typeError('Current Salary must be a number').required('Current Salary is required'),

  expectedSalary: Yup.number().typeError('Expected Salary must be a number').required('Expected Salary is required'),

  currentCompanyName: Yup.string().required('Company name is required'),

  noticePeriod: Yup.string().required('Notice Period is required'),

  reasonForChange: Yup.string().required('Reason for Change is required'),

  preferredShift: Yup.string().required('Preferred Shift is required'),

  source: Yup.string().required('Source is required'),

  resume: Yup.string().required('Resume is required'),

  // reference1Name: Yup.string().required('Reference 1 Name is required'),

  // reference1ContactNumber: Yup.string()
  //   .required('Reference 1 Contact Number is required')
  //   .matches(/^[0-9]{6,15}$/, 'Contact number must be between 6 and 15 digits'),

  // reference1Designation: Yup.string().required('Reference 1 Designation is required'),

  // reference1Experience: Yup.string().required('Reference 1 Experience is required'),
  // reference2Name: Yup.string().required('Reference 2 Name is required'),

  // reference2ContactNumber: Yup.string()
  //   .required('Reference 2 Contact Number is required')
  //   .matches(/^[0-9]{6,15}$/, 'Contact number must be between 6 and 15 digits'),

  // reference2Designation: Yup.string().required('Reference 2 Designation is required'),

  // reference2Experience: Yup.string().required('Reference 2 Experience is required')
})
