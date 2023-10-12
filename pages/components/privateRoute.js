
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [token,setToken]=useState(null);

  useEffect(() => {
   
    setToken( localStorage.getItem('accessToken'))
    if (token) {
      // User is authenticated, redirect them away from login, signup, and forget password pages
      if (
        router.pathname === '/authentication/sign-in' ||
        router.pathname === '/authentication/sign-up' ||
        router.pathname === '/authentication/forget-password'
      ) {
        router.push('/');
      }
    }
  }, [token, router.pathname]);

  return children;
};

export default PrivateRoute;
