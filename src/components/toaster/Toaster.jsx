import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

export const successMsg = msg => {
  return toast.success(msg)
}

export const errorMsg = msg => {
  return toast.error(msg)
}
