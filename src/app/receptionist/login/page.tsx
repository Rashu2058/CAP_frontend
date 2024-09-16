"use client";

import Image from "next/image";

export default function Login() {
  return (
    <div className="login-container bg-purple-500 font-serif min-h-screen">
      {/* Navbar */}
      <nav className="navbar bg-gray-300 p-2">
        <div className="navbar-content flex justify-between items-center">
          <img
            src="/Logo GraceInn.png"
            alt="Logo"
            className="logo"
            width={80}
            height={80}
          />
          <div className="nav-items flex space-x-18 place-items-center">
            <a href="#" className="text-black hover:text-gray-100">Dashboard</a>
            <a href="#" className="text-black hover:text-gray-100">Customer Management</a>
            <a href="#" className="text-black hover:text-gray-100">Reservation</a>
            <a href="#" className="text-black hover:text-gray-100">Reports</a>
            <button className="login-btn bg-purple-700 text-white py-2 px-10 rounded-full hover:bg-purple-500">Login</button>
          </div>
        </div>
      </nav>

      {/* Hotel Image Section */}
      <div className="hotel-image-container relative">
        <Image
          src="/logImage.jpg"
          alt="Hotel Grace Inn"
          width={1500}
          height={500}
          className="hotel-image"
        />
        <div className="image-text-overlay absolute inset-0 flex flex-col justify-normal items-center text-center text-black text-shadow-lg">
          <h1 className="text-6xl font-serif">Hotel Grace Inn</h1>
          <p className="text-2xl italic font-serif">Where grace meets comfort</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="content flex flex-col items-center py-10">
        <header className="header text-center">
          <h6 className="text-6xl text-white font-serif">Welcome Back!!</h6>
          <p className="text-2xl text-white">Please Login to Continue</p>
        </header>

        {/* Login Panel */}
        <div className="login-panel-container flex justify-center items-center py-20 w-4/5">
          <div className="login-panel bg-white rounded-2xl shadow-lg p-10 w-[350px] h-[550px]">
            <h1 className="text-purple-700 text-2xl text-center font-mono">Receptionist Panel</h1>
            <h2 className="text-purple-700 text-center italic">Control Panel Login</h2>
            <form className="login-form mt-6">
              <div className="input-field mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="input-field mb-4">
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="sign-in-btn w-full bg-black text-white py-3 rounded-md"
              >
                Sign In
              </button>

              {/* Wave Container */}
              <div className="wave-container relative w-full mt-12 overflow-hidden">
                <svg
                  viewBox="0 0 500 243"
                  preserveAspectRatio="none"
                  className="wave-svg w-full h-24"
                >
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
      <footer className="footer bg-purple-500 text-center text-white py-10">
        <div className="footnav bg-gray-300 py-8"></div>
        <p className="text-white italic text-4xl">Hotel Grace Inn 2024</p>
      </footer>
    </div>
  );
}
