import Image from 'next/image';
import './globals.css';  // Scoped styles for login page

// navbar
export default function Login() {
  return (
    <div className="login-container"> 
      <nav className="navbar">
        <div className="navbar-content">
          <img src="/Logo GraceInn.png" alt="Logo" className="logo" width={80} height={80} />
          <div className="nav-items">
            <a href="#">Dashboard</a>
            <a href="#">Room Management</a>
            <a href="#">Reception Management</a>
            <a href="#">Reports</a>
            <button className="login-btn">Login</button>
          </div>
        </div>
      </nav>


      <div className="hotel-image-container">
        <Image 
          src="/logImage.jpg" 
          alt="Hotel Grace Inn" 
          width={1500} 
          height={500} 
          className="hotel-image"
        />
        <div className="image-text-overlay">
          <h1>Hotel Grace Inn</h1>
          <p>Where grace meets comfort</p>
        </div>
      </div>
     
      <main className="content">
        <header className="header">
          <h1>Welcome to </h1>
            <h1>Admin Portal pushpa</h1>
          <p>Please Login to Continue</p>
        </header>

        <div className="login-panel-container">
          <div className="login-panel">
            <h1>Admin Panel</h1>
            <h2>Control Panel Login</h2>
            <form className="login-form">
              <div className="input-field">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="input-field">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" />
              </div>
              <button type="submit" className="sign-in-btn">Sign in</button>
            </form>
          </div>
        </div>
      </main>

      <footer className="footer">
      <nav className="footnav"></nav>
        Hotel Grace Inn 2024
      </footer>
    </div>
  );
}
