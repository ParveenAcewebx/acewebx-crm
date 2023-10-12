import axios from "axios";


 const ApiBase = axios.create({
  baseURL: "https://api.virtruelguides.com/api/v1.0.0/",
});

 ApiBase.interceptors.response.use(
  (response) => {
  
    return response;
  },
  (error) => {
    return Promise.reject(error.response.data.message);

  }
);

 ApiBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if(token){
    config.headers['x-access-token'] = token ;
    }
    //Modify the request if needed
    // request.headers.common.Accept = 'application/json';
  return config;
   },
  (error) => {
    return Promise.reject(error.response.data.message);
    
  }

);

export default ApiBase;

