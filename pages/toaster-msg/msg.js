import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from "react-toastify";

export function errorMsg(myToast) {
  toast.error(myToast, {
    position: toast.POSITION.TOP_RIGHT,
    
  });
}

export function successMsg(myToast) { 
  toast.success(myToast, {
    position: toast.POSITION.TOP_RIGHT,
  });
}
