import * as Yup from 'yup'

export const SearchValidation = Yup.object().shape({
    search: Yup.string().trim()
    .required('Email/Name/Phone is required')
    .min(3, 'Minimum 3 characters are required')
})
export const SearchSkill = Yup.object().shape({
    search: Yup.string().trim()
    .required('Title is required')
    .min(3, 'Minimum 3 characters are required')
})
export const SearchEvent = Yup.object().shape({
    search: Yup.string().trim()
    .required('Title/Description is required')
    .min(3, 'Minimum 3 characters are required')
})

export const SearchEmployee = Yup.object().shape({
    search: Yup.string().trim()
    .required('Email/Name/Phone is required')
    .min(3, 'Minimum 3 characters are required')
})