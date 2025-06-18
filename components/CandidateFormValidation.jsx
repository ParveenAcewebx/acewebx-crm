import * as Yup from "yup";

export const CandidateFormValidation = Yup.object().shape({
  firstname: Yup.string()
    .required("Full Name is required")
    .min(3, "Minimum 5 characters are required")
    .max(25, "Maximum 25 characters are required"),

  lastname: Yup.string()
    .required("Last Name is required")
    .min(2, "Minimum 2 characters are required")
    .max(25, "Maximum 25 characters are required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .min(6, "Minimum 6 characters are required")
    .max(15, "Maximum 15 characters are required"),
});
