"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { useLogo } from '@/app/LogoContext';
import ErrorPopup from '../popup.tsx/ErrorPopup';
import SuccessBox from '../popup.tsx/SuccessBox';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const loginPanelRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { logoUrl } = useLogo();
  const router = useRouter();

  const handleForgotPassword = () => {
    router.push('/receptionist/login/ForgotPassword'); // Redirect to ForgotPassword page
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsInView(entry.isIntersecting));
      },
      { threshold: 0.3 }
    );

    if (loginPanelRef.current) {
      observer.observe(loginPanelRef.current);
    }

    return () => {
      if (loginPanelRef.current) {
        observer.unobserve(loginPanelRef.current);
      }
    };
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
        username,
        password,
      });

      if (response.status === 200 && response.data.token && response.data.role) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        setSuccessMessage('Signin successful!');

        if (response.data.role === 'ADMIN') {
          window.location.href = '/admin/dashboard#';
        } else if (response.data.role === 'RECEPTIONIST') {
          window.location.href = '/receptionist/dashboard#';
        } else {
          setErrorMessage('Unauthorized login');
        }
      } else {
        setMessage('Signin failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in:', error); 
      setErrorMessage('Signin failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 p-14">
      <div className="min-h-screen rounded-xl bg-gray-200 px-8 relative">
        
{/* Main Content */}
        <main className="content flex flex-col items-center relative">
          
{/* Logo */}
          <div className="absolute top-5 left-5">
            <img
              src={logoUrl}
              alt="Logo"
              width={80}
              height={80}
              className="rounded-full shadow-md"
            />
          </div>

{/* Main Login Image */}
          <img
            src="/image.png"
            alt="LogInImage"
            width={600}
            height={600}
            className="z-10"
          />

{/* Login Panel */}
          <div className="login-panel-container flex justify-center items-center py-20 w-4/5">
            <div className="rounded-3xl bg-white shadow-lg p-10 w-[350px] h-[550px] relative overflow-hidden">
              <h1 className="text-black text-3xl text-center font-mono">
                Login Panel
              </h1>
              <h2 className="text-black text-center italic">
                Control Panel Login
              </h2>

              <form className="login-form mt-6 relative z-10" onSubmit={handleLogin}>
                <div className="input-field mb-4">
                  <label className="block text-black mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={15}
                  />
                </div>
                <div className="input-field mb-4">
                  <label className="block text-black mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={15}
                  />
                  
{/* Forgot Password Button */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

{/* SignIn Button */}
                <button
                  type="submit"
                  className="sign-in-btn w-full bg-gray-600 text-white py-3 rounded-md font-semibold shadow-lg"
                >
                  Sign In
                </button>
                {message && <p>{message}</p>}
              </form>

{/* Inline Style Animation */}
              <style jsx global>{`
                @keyframes wave-animation-1 {
                  0% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(20px);
                  }
                  100% {
                    transform: translateY(0);
                  }
                }

                @keyframes wave-animation-2 {
                  0% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(-15px);
                  }
                  100% {
                    transform: translateY(0);
                  }
                }

                @keyframes wave-animation-3 {
                  0% {
                    transform: translateY(0);
                  }
                  50% {
                    transform: translateY(10px);
                  }
                  100% {
                    transform: translateY(0);
                  }
                }

                .animate-wave-1 {
                  animation: wave-animation-1 4s ease-in-out infinite;
                }

                .animate-wave-2 {
                  animation: wave-animation-2 4s ease-in-out infinite;
                }

                .animate-wave-3 {
                  animation: wave-animation-3 4s ease-in-out infinite;
                }
                .animate-wave-4 {
                  animation: wave-animation-4 4s ease-in-out infinite;
                }
              `}</style>

{/* Wavy Background Layers */}
              <div
                key="wave-1"
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-blue-400 via-gray-500 to-zinc-600 rounded-b-3xl animate-wave-1"
                style={{
                  clipPath:
                    "path('M0,100 C150,120 350,40 500,100 L500,200 L0,200 Z')",
                }}
              ></div>
              <div
                key="wave-2"
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-blue-300 via-gray-400 to-zinc-500 opacity-80 animate-wave-2"
                style={{
                  clipPath:
                    "path('M0,90 C120,110 300,50 500,90 L500,200 L0,200 Z')",
                }}
              ></div>
              <div
                key="wave-3"
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-blue-200 via-gray-300 to-zinc-400 opacity-60 animate-wave-3"
                style={{
                  clipPath:
                    "path('M0,80 C100,100 250,70 500,80 L500,200 L0,200 Z')",
                }}
              ></div>
              <div
                key="wave-4"
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-blue-400 via-gray-500 to-zinc-600 opacity-40 animate-wave-4"
                style={{
                  clipPath:
                    "path('M0,70 C100,90 200,90 500,70 L500,200 L0,200 Z')",
                }}
              ></div>
            </div>
          </div>
        </main>
      </div>
      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
        {successMessage && <SuccessBox message={successMessage} onClose={() => setSuccessMessage("")} />}
        
    </div>
  );
}