import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/Logo.jpg";
import Bgimage from "../assets/bgimage.jpg";
import Bg from "../assets/bg.jpg";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";

const HomePage = () => {
  return (
    <div>
      <div className="relative">
        <header className="bg-white border border-gray-200 rounded-lg shadow-lg max-w-lg mx-auto z-20 relative">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-teal-600 text-3xl font-bold font-sans">Welcome to TALKConnect!</h1>
              <h2 className="text-teal-500">Pioneers in engaging volunteers for the healthcare community.</h2>
              <br />
              <Link to="/events">
                <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300">
                  Find Opportunities
                </button>
              </Link>
            </div>
          </div>
        </header>
        <Slideshow />

        <main>
          <section></section>

          <section>
            <h2></h2>
            <p></p>
          </section>

          <section>
            <h2></h2>
            <p></p>
          </section>
        </main>

        <footer className="bg-gray-800 text-white p-4 text-center z-10">
          <p>© 2024 TALKConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;

{
  /*Background image styling is here
<div
style={{
  backgroundImage: `url(${Bg})`,
  backgroundSize: 'cover',  // Makes the image smaller
  backgroundRepeat: 'no-repeat',  // Prevents image from repeating
  minHeight: '100vh',
}}> */
}

{
  /* <div>
        {/* Conditionally render based on login status 
        {isLoggedIn ? (
          <div>
            <h1>Welcome Back, User!</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Welcome to Our Website!</h1>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div> */
}

{
  /* Add quote here with negative margin to move it up */
}
{
  /* <blockquote className="text-gray-500 italic mb-2 -mt-8">
                "The best way to find yourself is to lose yourself in the service of others."
              </blockquote> */
}
