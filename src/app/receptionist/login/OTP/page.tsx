"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OTP() {
  const [otp, setOtp] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 6) {
      setMessage('Please enter a valid 6-digit OTP.');
      return;
    }
    console.log('OTP Verified:', otp); // Debug log
    router.push('/receptionist/login/Reset'); // Redirect to Reset Password page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Verify OTP</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit verification code sent to your email.
        </p>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Verification Code</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyOTP}
          className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Verify OTP
        </button>

        {/* Error/Success Message */}
        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
}