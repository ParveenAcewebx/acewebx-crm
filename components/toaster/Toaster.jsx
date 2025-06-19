import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const successMsg = (msg) => {
  toast.success(msg);
};

export const errorMsg = (msg) => {
  toast.error(msg);
};
