
import axios from "axios";


const ApiClient = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => {
      if (response.data.errorCode == 601) {
        signOut();
        return Promise.reject(response.data);
      }
      return response.data;
    },
    (error) => {
      return Promise.reject(error?.response?.data);
    }
  );

  return instance;
};

export default ApiClient();
