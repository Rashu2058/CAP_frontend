"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function TokenVerification() {
  const [token, setToken] = useState<string>('');  
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const handleVerifyToken = () => { 
    if (!token) {
      setMessage('Please enter the token.');
      return false; 
    }
   
  };

  const validatePassword = (password: string): boolean => {  // Password validation function
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Please enter both password and confirm password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // if (!validatePassword(newPassword)) {
    //   setMessage(
    //     'Password must be at least 6 characters long and include at least one number and one special character.'
    //   );
    //   return;
    // }

    const requestBody = {
      token: token,
      password: newPassword,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/reset-password', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Password reset successfully!');
        router.push('/login');
      } else {
        setMessage(response.data.message || 'Failed to reset password.');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleConfirm = () => {
    const isTokenValid = handleVerifyToken();  
    if (isTokenValid) {
      handleResetPassword();
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

{/* Confirm Button */}
        <button
          onClick={handleResetPassword} 
          className="w-full bg-zinc-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
        >
          Confirm
        </button>

{/* Error/Success Message */}
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
