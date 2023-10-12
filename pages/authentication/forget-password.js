import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "pages/pages/forminputs/FormInput";
import AuthLayout from "layouts/AuthLayout";
import { successMsg, errorMsg } from "pages/toaster-msg/msg";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("You must enter a valid email")
    .required("Email is required"),
});

const ForgetPassword = () => {
  const {
    control,
    handleSubmit,
    reset, // Add reset from useForm
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("data", data);
    successMsg("please check your email");
    reset();
  };

  return (
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
              <p className="mb-6">
                Don&apos;t worry, we&apos;ll send you an email to reset your
                password.
              </p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <FormInput
                  name="email"
                  className=""
                  control={control}
                  label="Enter Email "
                />
                <span className="text-danger">{errors.email?.message}</span>
              </Form.Group>
              {/* Button */}
              <div className="mb-3 d-grid">
                <Button variant="primary" type="submit">
                  Reset Password
                </Button>
              </div>
              <span>
                Don&apos;t have an account?{" "}
                <Link href="/authentication/sign-in">Sign In</Link>
              </span>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ForgetPassword.Layout = AuthLayout;

export default ForgetPassword;
