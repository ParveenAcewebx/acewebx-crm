import * as yup from 'yup'

export const ReceiverSchema = yup.object().shape({
  purchaseOrder: yup.string().required('Purchase Order is required'),
})

