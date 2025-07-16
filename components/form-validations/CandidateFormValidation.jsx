import * as Yup from 'yup'

export const CandidateFormValidation = Yup.object().shape({
  name: Yup.string()
    .required('Full Name is required')
    .min(3, 'Minimum 3 characters are required')
    .max(50, 'Maximum 50 characters allowed'),

  dob: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Date of Birth is required'),
  // .max(dayjs().subtract(15, 'year').toDate(), 'You must be at least 15 years old'),

  email: Yup.string()
  .required('Email is required')
  .test('is-valid-email', 'Invalid email format', function (value) {
    if (!value) return true; // Let 'required' handle empty case
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(value);
  }),
  noticePeriod: Yup.number()
    .min(0, 'Minimum 0 day allowed')
    .max(90, 'Maximum 90 day allowed'),
  gender: Yup.string().required('Gender is required'),

  phone: Yup.string()
    .transform(
      value => value?.replace(/\+91\s?|\s+/g, '') // remove +91 and all spaces
    )
    .required('Contact number is required')
    .matches(
      /^[6-9]\d{9}$/,
      'Enter a valid 10-digit mobile number starting with 6-9'
    ),

  currentLocation: Yup.string().required('Current Location is required'),

  designationApplyingFor: Yup.string().required('Please select a designation'),

  totalExperience: Yup.string().required('Total Experience is required'),

  currentSalary: Yup.number()
    .typeError('Current Salary must be a number')
    .required('Current Salary is required'),

  expectedSalary: Yup.number()
    .typeError('Expected Salary must be a number')
    .required('Expected Salary is required'),

  currentCompanyName: Yup.string().required('Company name is required'),

  reasonForChange: Yup.string().required('Reason for Change is required').max(500),
  currentAddress: Yup.string().max(500),
  permanentAddress: Yup.string().max(500),
  preferredShift: Yup.string().required('Preferred Shift is required'),

  resume: Yup.mixed()
    .required('Resume is required')
    .test('fileExists', 'Resume is required', value => {
      return value instanceof File || (value && value.length > 0)
    })
    .test(
      'fileSize',
      'File size must be less than or equal to 15 MB',
      value => {
        if (!value) return true // already handled by required
        const file = value instanceof File ? value : value[0]
        return file?.size <= 15 * 1024 * 1024 // 15 MB in bytes
      }
    ),

  recaptcha: Yup.string().required('Captcha is required')
})
