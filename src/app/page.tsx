"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './globals.css';

export default function LandingPage() {
  const boardMembers = [
    { name: "John Doe", title: "CEO", photo: "/elizabeth.jpeg", description: "John has 20 years of experience in the hospitality industry and leads with passion." },
    { name: "Jane Smith", title: "COO", photo: "/joe.jpeg", description: "Jane specializes in operations and ensures everything runs smoothly." },
    { name: "Alice Brown", title: "CFO", photo: "/modi.jpeg", description: "Alice manages the finances and strategic planning of the hotel." },
  ];

  const testimonials = [
    { name: "Emily Rose", comment: "Amazing experience! The staff were so friendly and the amenities were top-notch.", photo: "/emily_rose.jpg" },
    { name: "Michael Lee", comment: "A perfect getaway. The rooms were luxurious and the food was exquisite.", photo: "/michael_lee.jpg" }
  ];

  const handleLoginClick = () => {
      window.location.href='/receptionist/login'
  }

  return (
    <div className="landing-container">
      <nav className="navbar">
      <img src="/Logo.jpg" alt="Logo" className="logo" width={80} height={80} />
        <div className="navbar-content">
           <div className="nav-items">
            <a href="#about" className="nav-link">About Us</a>
            <a href="#board-members" className="nav-link">Board Members</a>
            <a href="#amenities" className="nav-link">Amenities</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button onClick={handleLoginClick}>login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>Hotel Grace Inn is dedicated to providing exceptional hospitality experiences. Our mission is to combine luxury and comfort to create unforgettable stays for our guests.</p>
        <p>Founded in 2000, we have become a premier destination for travelers seeking elegance and world-class service.</p>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="amenities-section">
        <h2>Our Amenities</h2>
        <div className="amenities-container">
          <div className="amenity-item">
            <img src="/swimmingpool.jpeg" alt="Pool" />
            <p>Luxury Pool</p>
          </div>
          <div className="amenity-item">
            <img src="/room.jpeg" alt="Spa" />
            <p>Luxury rooms</p>
          </div>
          <div className="amenity-item">
            <img src="/dinin.jpeg" alt="Dining" />
            <p>Gourmet Dining</p>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section id="board-members" className="board-members-section">
        <h2>Meet Our Board Members</h2>
        <div className="board-members-container">
          {boardMembers.map((member, index) => (
            <div key={index} className="board-member">
              <Image
                src={member.photo}
                alt={member.name}
                width={200}
                height={200}
                className="board-member-photo"
              />
              <h3>{member.name}</h3>
              <p><strong>{member.title}</strong></p>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <h2>What Our Guests Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <Image
                src={testimonial.photo}
                alt={testimonial.name}
                width={100}
                height={100}
                className="testimonial-photo"
              />
              <p><em>"{testimonial.comment}"</em></p>
              <p>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h1>Contact Us</h1>
        <p>Email: contact@graceinn.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Grace Street, Hospitality City, Country</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4013616846816!3d37.787358979756294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c0bd8d081%3A0x18628e11e55c5ba9!2s123%20Grace%20Street%2C%20Hospitality%20City%2C%20Country!5e0!3m2!1sen!2sus!4v1604103424453!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footnav bg-gray-300 py-8">Hotel Grace Inn © 2025</div>
      </footer>

      <style jsx>{`
        .navbar {
          display: flex;
          font-size:1.2rem;
          justify-content: space-between;
          align-items: center;
          padding: 8px 20px;
          background: linear-gradient(90deg,rgb(232, 229, 243), #2b5876);
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .navbar-content {
          display: flex;
          align-items: center;
          gap: 20px; /* Space between nav links and button */
        }

        .logo {
          width: 50px;
          height: 50px;
       }  
        .nav-items {
            display: flex;
            align-items: center;
            gap: 15px; /* Space between nav links */
        }

        .nav-link {
          margin: 0 1rem;
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #ffd700;
        }
        .hotel-image-container {
          position: relative;
        }
        .hotel-image {
          filter: brightness(80%);
        }
        .image-text-overlay {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: black;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
       
       button {
        background-color:#7f64a1;
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }

      button:hover {
        background-color:rgb(11, 86, 148);
      }
        .about-section, .contact-section {
         
          padding: 2rem;
          background: #f4f4f9;
          text-align: center;
        }
        .amenities-section {
          padding: 2rem;
          background: #eef2f3;
          text-align: center;
        }
          
       h2 {
          font-size: 2rem;
          font-weight: bold;
          font-family:  sans-serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          color:rgb(14, 13, 13);
        }
        .amenities-container {
          display: flex;
          justify-content: center;
          
          gap: 2rem;
          flex-wrap: wrap;
        }
        .amenity-item {
          text-align: center;
        }
        .board-members-section {
          padding: 2rem;
          background: #e9ecef;
          text-align: center;
        }
        .board-members-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .board-member {
          background: white;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .board-member:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .board-member-photo {
          border-radius: 50%;
        }
        .testimonials-section {
          padding: 2rem;
          background: #f8f9fa;
          text-align: center;
        }
        .testimonials-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .testimonial {
          background: white;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          max-width: 300px;
        }
        .testimonial-photo {
          border-radius: 50%;
          margin-bottom: 1rem;
        }
        footer {
          background: linear-gradient(90deg, #4e4376, #2b5876);
          color: white;
          text-align: center;
          padding: 1rem 0;
        }
      `}</style>
    </div>
  );
}
