// lib/loaderProxy.js
let loader = {
    startLoading: () => {},
    stopLoading: () => {},
  }
  
  export const setLoaderFunctions = fn => {
    loader = fn
  }
  
  export const loaderProxy = loader
  