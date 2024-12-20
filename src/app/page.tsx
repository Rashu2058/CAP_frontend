"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './globals.css';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const loginPanelRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const[isLoginPanelvisible,setIsLoginPanelVisible]=useState(false)

  const scrollToLoginPanel = () => {
    setIsLoginPanelVisible(true);
    setTimeout(()=>{
    if (loginPanelRef.current) {
      loginPanelRef.current.scrollIntoView({ behavior: "smooth" });
  }
},100);
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
        setMessage('Signin successful!');
        
        if (response.data.role === 'ADMIN') {
          window.location.href = '/admin/dashboard#';
        } else if (response.data.role === 'RECEPTIONIST') {
          window.location.href = '/receptionist/dashboard#';
        } else {
          setMessage('Unauthorized login');
        }
      } else {
        setMessage('Signin failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setMessage('Signin failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="navbar-content">
          <img src="/Logo GraceInn.png" alt="Logo" className="logo" width={80} height={80} />
          <div className="nav-items">
            <button className="login-btn"onClick={scrollToLoginPanel}>Login</button>
          </div>
        </div>
      </nav>

{/* Hotel Image Section */}
      <div className="hotel-image-container">
        <Image
          src="/logImage.jpg"
          alt="Hotel Grace Inn"
          width={1700}
          height={500}
          className="hotel-image"
        />
        <div className="image-text-overlay">
          <h1>Hotel Grace Inn</h1>
          <p>Where grace meets comfort</p>
        </div>
      </div>

{/* Main Content */}
      <main className="content">
        <header className="header">
          <h6>Please Login to Continue</h6>
        </header>

        <div className="login-panel-container" ref={loginPanelRef}>
          <div className={"login-panel"}>
            <h1>Login Panel</h1>
            <h2><i>Control Panel Login</i></h2>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-field">
                <label>Username</label>
                <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-field">
                <label>Password</label>
                <input type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                maxLength={8}
                />
              </div>
              <button type="submit" className="sign-in-btn">Sign in</button>

              {message && <p>{message}</p>}

{/* Wave Container */}
              <div className="wave-container">
                <svg viewBox="0 0 500 150" className="wave-svg">
                  <path d="M20,150 C-450,150 450,-100 600,50 L500,150 L0,150 Z" fill="#896caa"></path>
                  <path d="M0,150 C-500,50 350,150 500,10 L500,150 L0,150 Z" fill="#675180"></path>
                  <path d="M-45,135 C220,100 350,170 500,40 L500,150 L0,150 Z" fill="#463757"></path>
                </svg>
              </div>
            </form>
          </div>
        </div>
      </main>

{/* Footer */}
      <footer className="footer">
      <div className="footnav bg-gray-300 py-8"></div>
      Hotel Grace Inn</footer>
    </div>
  );
}
