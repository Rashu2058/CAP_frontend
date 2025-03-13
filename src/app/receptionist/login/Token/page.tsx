"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function TokenVerification() {
  const [token, setToken] = useState<string>('');  
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  interface ResponseMessage {
    error?: string;
    message?: string;
  }

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !password || !confirmPassword) {
      setErrorMessage('Token, password, and confirm password are required.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 6 characters long and include at least one number and one special character.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Sending POST request to the backend using axios
      const response = await axios.post<ResponseMessage>('http://localhost:8080/api/v1/auth/reset-password', {
        token,
        password,
      });

      toast.success('Password has been successfully reset.');
      // Handling response
      setSuccessMessage('Password has been successfully reset.');
      setTimeout(() => {
        router.push('/receptionist/login'); // Redirect to login page after successful reset
      }, 4000);
    } catch (error: any) {
      // Handling errors
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Failed to reset password. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Verify Token</h1> 
        <p className="text-gray-600 text-center mb-6">
          Enter the token sent to your email.
        </p>

        {/* Token Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Verification Token</label>
          <input
            type="text"
            placeholder="Enter Token"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={token} 
            onChange={(e) => setToken(e.target.value)}  
          />
        </div>

        {/* New Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            minLength={6}
            maxLength={15}
            placeholder="Enter new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            minLength={6}
            maxLength={15}
            placeholder="Confirm new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleResetPassword} 
          className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Confirm
        </button>

        {/* Error/Success Message */}
        {errorMessage && <p className="text-center mt-4 text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-center mt-4 text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}