import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import FormInput from "pages/pages/forminputs/FormInput";
import { errorMsg, successMsg } from "pages/toaster-msg/msg";
import authApis from "pages/services/authApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required")
  .min(4, "should be 4 chars minimum."),
});

const SignIn = () => {
 
  const router = useRouter();
  const [previousURL, setPreviousURL] = useState(null);

  // Default token value
  const defaultToken = "defaultToken";
  // const user = { email: "test@123.com", password: "123" }

  const { control,reset,handleSubmit, formState: { errors }, } = 
  useForm({ resolver: yupResolver(validationSchema), });

  const onSubmit =async (data) => {
    // const { email, password } = data;

try{
  const result =await authApis.loginAuth(data)
  
  console.log("result",result)
    const token = result.data.data.accessToken;
    localStorage.setItem( 'accessToken', JSON.stringify(token) );
  // localStorage.setItem("accessToken", token);
 console.log('mytoken',token)
  successMsg("login successful"); 
  router.push("/");

}catch (error) {
 
  errorMsg(error); 

  console.log("errr",error)
  // You need to implement errorMsg function
}



//     if (email === user.email && password === user.password) {
//        // Authentication successful

     
//       console.log("Authentication successful");
//       successMsg("Welcome to the dashboard");  //tostify msg
// console.log("successMsg",successMsg)
//       // Set the default token in localStorage
//       localStorage.setItem("authToken", defaultToken);

//       // Redirect to another page after successful login
//       router.push("/");
//     } else {
//       // Authentication failed
//       errorMsg("Invalid user");
//       console.log("Authentication failed");
//     }
reset();
  }
  
 
  return (
    <>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
          <Card className="smooth-shadow-md">
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link href="/">
                  <Image
                    src="/images/brand/logo/logo-primary.svg"
                    className="mb-2"
                    alt=""
                  />
                </Link>
                <p className="mb-6">Please enter your user information.</p>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <FormInput name="email" className="" control={control} />
                  <span className="text-danger">{errors.email?.message}</span>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <FormInput name="password" className="" control={control}  inputType="password"/>
                  <span className="text-danger">
                    {errors.password?.message}
                  </span>
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Sign In
                    </Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">
                        Create An Account
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/authentication/forget-password"
                        className="text-inherit fs-5"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
