"use client"; // Only if you're using Next.js App Router

import React from "react";
import { CheckCircle } from "lucide-react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white relative">
    {/* Honeycomb Background Pattern */}
    <div className="absolute inset-0 bg-[url('/background-honeycomb.png')] opacity-10 bg-repeat" />
  
    {/* Left & Right Background Images */}
    <img
      src="/Left.png"
      alt="Left Background"
      className="absolute left-0 bottom-0 h-full w-auto z-0"
    />
    <img
      src="/Right.png"
      alt="Right Background"
      className="absolute right-0 bottom-0 h-full w-auto z-0"
    />
  
    {/* Logo */}
    <div className=" text-center z-10 acewebx-logo">
      <img
        src="./acewebxlogo.png"
        alt="Acewebx Logo"
        className="h-20 w-auto mx-auto"
      />
    </div>
  
    {/* Thank You Message Box */}
    <div className="bg-gradient-to-br from-red-100 via-white to-red-100 p-10 rounded-2xl shadow-md w-full max-w-5xl z-10 border border-red-100 flex flex-col items-center justify-center text-center logopadding">
      <img
        src="/Vector.svg" // replace with your green check icon
        alt="Success"
        className="h-16 w-16 mb-6"
      />
      <p className="text-lg text-gray-800 font-medium">
        Your message has been sent successfully. We’ll get back<br />
        to you as soon as possible.
      </p>
    </div>
  </div>
  
  );
};

export default ThankYouPage;
