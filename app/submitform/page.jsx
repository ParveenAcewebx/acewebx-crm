"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CandidateFormValidation } from "@/components/CandidateFormValidation";
import { useRouter } from "next/navigation";

function SubmitForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CandidateFormValidation),
  });

  const router = useRouter();

  const onSubmit = (data) => {
    console.log("Data --->", data);
    if (data) {
      router.push("/thankyou");
    }
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white relative w-full">
      {/* Background honeycomb pattern - optional: use background image or SVG */}

      <div className="absolute inset-0 bg-[url('/background-honeycomb.png')] opacity-10" />
      {/* Left background */}
      <img
        src="/Left.png"
        alt="Left Background"
        className="absolute left-0 bottom-0 h-full w-auto z-0"
      />

      {/* Right background */}
      <img
        src="/Right.png"
        alt="Right Background"
        className="absolute right-0 bottom-0 h-full w-auto z-0"
      />
      {/* Logo */}
      <div className=" text-center z-10">
        <img
          src="./acewebxlogo.png"
          alt="Acewebx Logo"
          className="h-25 w-40 
"
        />
      </div>

      {/* Form Container */}
      <div className="bg-gradient-to-br from-red-100 via-white to-red-100 p-10 rounded-xl shadow-md w-full max-w-3xl z-10 border border-red-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Walk-in Form
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormInput
            inputType="text"
            name="firstname"
            control={control}
            label="First Name"
            errors={errors}
          />
          <FormInput
            inputType="text"
            name="lastname"
            control={control}
            label="Last Name"
            errors={errors}
          />
          <FormInput
            inputType="email"
            name="email"
            control={control}
            label="Email"
            errors={errors}
          />
          <FormInput
            inputType="number"
            name="phone"
            control={control}
            label="Phone"
            errors={errors}
          />

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              variant="outlined"
              className="!text-red-500 !border-red-500 hover:!bg-red-100 transition"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitForm;
