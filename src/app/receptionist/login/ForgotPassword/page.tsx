"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleProceed = () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }
    console.log('Proceed clicked'); // Debug log
    router.push('/receptionist/login/OTP'); // Redirect to OTP page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Forgot Password?</h1>
        <p className="text-gray-600 text-center mb-6">
          A 6-digit verification code will be sent to your email.
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
          onClick={handleProceed}
          className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          PROCEED
        </button>

        {/* Error/Success Message */}
        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
}