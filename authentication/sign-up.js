import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "pages/pages/forminputs/FormInput";
import AuthLayout from "layouts/AuthLayout";
import { successMsg, errorMsg } from "pages/toaster-msg/msg";
import { ToastContainer, toast } from "react-toastify"; // Import the ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import { Router } from "react-bootstrap-icons";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required") .min(6, "should be 6 chars minimum."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {


  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset, // Add reset from useForm
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const { email, password, username } = data;
    if (data !== "") {
      successMsg("Registration completed successfuly ");
      router.push("/authentication/sign-in");
    } else {
      errorMsg("sign up correctly");
      // Your form submission logic here
    }

    // Clear the form after successful submission
    reset(); // This will reset the form to its initial state
  };

  
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
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username or email</Form.Label>
                  <FormInput name="username" className="" control={control} />
                  <span className="text-danger">
                    {errors.username?.message}
                  </span>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <FormInput name="email" className="" control={control} />
                  <span className="text-danger">{errors.email?.message}</span>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <FormInput
                    name="password"
                    className=""
                    control={control}
                    inputType="password"
                  />
                  <span className="text-danger">
                    {errors.password?.message}
                  </span>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3" controlId="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <FormInput
                    name="confirmPassword"
                    className=""
                    control={control}
                    inputType="password"
                  />
                  <span className="text-danger">
                    {errors.confirmPassword?.message}
                  </span>
                </Form.Group>

                {/* Checkbox */}
                <div className="mb-3">
                  <Form.Check type="checkbox" id="check-api-checkbox">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>
                      I agree to the <Link href="#"> Terms of Service </Link>{" "}
                      and <Link href="#"> Privacy Policy.</Link>
                    </Form.Check.Label>
                  </Form.Check>
                </div>

                <div>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Create Free Account
                    </Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-in" className="fs-5">
                        Already a member? Login
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

SignUp.Layout = AuthLayout;

export default SignUp;
