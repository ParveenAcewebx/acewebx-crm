import * as Yup from 'yup'

export const EventValidation = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required')
    .min(3, 'Minimum 3 characters are required'),

  fromDate: Yup.date()
    .required('From Date is required')
    .min(new Date('2024-12-31'), 'From Date must be after 2024-12-31'),

  toDate: Yup.date()
    .required('To Date is required')
    .min(
      Yup.ref('fromDate'),
      'To Date must be equal to or after From Date'
    ),

  isHoliday: Yup.string()
    .required('Holiday status is required'),

  
})
