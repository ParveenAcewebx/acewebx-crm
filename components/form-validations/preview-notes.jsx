import * as yup from 'yup'

export const PreviewNotes = yup.object().shape({
    description: yup.string().required('Notes is required'),
})
