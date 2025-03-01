"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  // Password validation function
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleResetPassword = () => {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Validate password strength
    if (!validatePassword(newPassword)) {
      setMessage(
        'Password must be at least 6 characters long and include at least one number and one special character.'
      );
      return;
    }

    console.log('Password Reset:', newPassword); // Debug log
    setMessage('Password reset successfully!');
    router.push('/receptionist/login'); // Redirect to Login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">Reset Password</h1>

        {/* New Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            minLength={6}
            maxLength={15}
            placeholder="Enter new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

        {/* Reset Button */}
        <button
          onClick={handleResetPassword}
          className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Reset Password
        </button>

        {/* Error/Success Message */}
        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
}