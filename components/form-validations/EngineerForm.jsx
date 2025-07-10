import * as yup from 'yup';

export const EngineerFormSchema = yup.object().shape({
   name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required'),
    phone: yup.string().required('Phone is required'),
    address: yup.string().required('Address is required'),

});

