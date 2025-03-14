"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import React, { FormEvent } from "react";

type ResponseMessage = {
  message: string;
};

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format. Only Gmail addresses are allowed.');
      return;
    }

    try {
      // Sending the email to the backend API to initiate the reset process
      const response = await axios.post<ResponseMessage>('http://localhost:8080/api/v1/auth/forgot-password', { email });

      toast.success('Password reset email sent successfully. Please check your inbox.');
      // Handling success response
      setSuccessMessage('Password reset email sent successfully. Please check your inbox.');
      setEmail(''); // Clear the email input field
      setTimeout(() => {
        router.push('/receptionist/login/Token'); // Redirect to reset password page after successful reset
      }, 2000);
    } catch (error: any) {
      // Handling error response
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Failed to send reset email. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Forgot Password?</h1>
        <p className="text-gray-600 text-center mb-6">
          A token will be sent to your email.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleForgotPassword}
          className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          PROCEED
        </button>

        {/* Error/Success Message */}
        {errorMessage && <p className="text-center mt-4 text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-center mt-4 text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}