import * as Yup from 'yup'

export const EmployeeValidation = Yup.object().shape({
  // Personal Info
  name: Yup.string().trim().required('Name is required'),
  personalEmail: Yup.string().trim().email('Invalid email').required('Personal Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  alternatePhone: Yup.string()
    .optional()
    .matches(/^[0-9]{10}$/, 'Alternate phone must be 10 digits'),
  dobDocument: Yup.date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .required("Date of Birth (Document) is required"),
  //   dobCelebration: Yup.date().nullable(), // Optional
  currentAddress: Yup.string().trim().required('Current Address is required'),
  permanentAddress: Yup.string().trim().required('Permanent Address is required'),

  // Professional Info
  companyEmail: Yup.string().trim().email('Invalid email').required('Company Email is required'),
  designation: Yup.string().trim().required('Designation is required'),
  dateOfJoining: Yup.date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .required("Date of Joining is required"),

  // Documents
  adharCard: Yup.string()
    .required('Aadhar Card is required')
  ,
  panCard: Yup.string()
    .required('PAN Card is required'),
  // new fields:-
  referenceNumber: Yup.string().max(15, "Maximum 15 characters are allowed"),
  employeeCode: Yup.string()
    .trim()
    .max(15, "Maximum 15 characters are allowed"),
    
  // Banking Details
  bankName: Yup.string().trim().required('Bank Name is required'),
  bankAccountNumber: Yup.string()
    .required('Bank Account Number is required')
    .matches(/^[0-9]{9,18}$/, 'Bank Account must be 9 to 18 digits'),
  bankIfscCode: Yup.string()
    .required('IFSC Code is required')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code'),

  // Emergency Details
  bloodGroup: Yup.string()
    .required('Blood Group is required'),
  emergencyContactName: Yup.string().required('Emergency Contact Name is required'),
  emergencyContactNumber: Yup.string()
    .required('Emergency Contact Number is required')
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
  emergencyContactRelationship: Yup.string().required('Emergency Contact Relationship is required'),
})
