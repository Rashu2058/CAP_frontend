import Image from 'next/image';
import './globals.css';  

// navbar
export default function Login() {
  return (
    <div className="login-container"> 
      <nav className="navbar">
        <div className="navbar-content">
          <img src="/Logo GraceInn.png" alt="Logo" className="logo" width={80} height={80} />
          <div className="nav-items">
            <a href="#">Dashboard</a>
            <a href="#">Rooms</a>
            <a href="#">Receptionists</a>
            <a href="#">Food Menu</a>
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
          <h6>Welcome to Admin Portal puspa</h6>
          <p>Please Login to Continue</p>
        </header>

        <div className="login-panel-container">
          <div className="login-panel">
            <h1>Admin Panel</h1>
            <h2><i>Control Panel Login</i></h2>
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

      <footer className="footer">
      <nav className="footnav"></nav>
        Hotel Grace Inn 2024
      </footer>
    </div>
  );
}
