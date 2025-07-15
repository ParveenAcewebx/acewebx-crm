import * as Yup from 'yup'

export const SalesCandidateValidation = Yup.object().shape({
  name: Yup.string()
    .required('Full Name is required')
    .min(3, 'Minimum 3 characters are required')
    .max(50, 'Maximum 50 characters allowed'),

  phone: Yup.string()
    .transform(
      value => value?.replace(/\+91\s?|\s+/g, '') // remove +91 and all spaces
    )
    .required('Contact number is required')
    .matches(
      /^[6-9]\d{9}$/,
      'Enter a valid 10-digit mobile number starting with 6-9'
    ),
  // .max(dayjs().subtract(15, 'year').toDate(), 'You must be at least 15 years old'),

  // email: Yup.string().email('Please enter a valid email').required('Email is required'),
  email: Yup.string()
    .required('Email is required')
    .test('is-valid-email', 'Invalid email format', function (value) {
      if (!value) return true // Skip format check if empty (required will handle it)
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    }),
    joiningDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Date of Birth is required'),
})
