import * as yup from 'yup'

export const MaterialQuotesValidation = yup.object().shape({
    customer_id: yup.string().required('Customer is required'),
    ship_to: yup.string().required('Ship To is required'),
    materialItems: yup.array().of(
        yup.object().shape({
          qty: yup.string().max(6, 'Quantity cannot be more than 6 digits'), // max 6-digit number
          uom: yup.string().max(4, 'UOM cannot be more than 4 characters'),
          margin: yup.string().max(4, 'Margin cannot be more than 4 characters')
        })
      )
})
