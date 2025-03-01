"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VerifyOTP from './OTP';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleProceed = async () => {
    if (!email || email.length !== 20) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      // Simulate sending OTP to the mobile number
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Redirect to OTP verification page
        router.push(`/verify-otp?email=${email}`);
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password?</h1>
        <p className="text-gray-600 text-center mb-6">
          A 6-digit verification code will be sent to your email.
        </p>

        {/* Mobile Number Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={20}
          />
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          PROCEED
        </button>

        {/* Error/Success Message */}
        {message && (
          <p className="text-center mt-4 text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}