"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleProceed = () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid gmail.');
      return;
    }

    console.log('Proceed clicked'); 
    router.push('/receptionist/login/Token'); 
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
          onClick={handleProceed}
          className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          PROCEED
        </button>

        {/* Error/Success Message */}
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}