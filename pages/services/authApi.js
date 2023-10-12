import ApiBase from "./authBase";
const authApis ={
  loginAuth: (data) => {
    return ApiBase.post("auth/login", data)
    
  },
}
 
  

export default authApis;
