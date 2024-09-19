import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/hearthand.jpg';
import LogoImg from '../assets/Logo.jpg';
import Bgimage from '../assets/bgimage.jpg'
import Navbar from '../components/Navbar';

  const HomePage = () => {
    return (
      <div>
         <div
        style={{
          backgroundImage: `url(${Bgimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
        > 
        
        {/* <div className="bg-white text-teal-500 h-screen flex flex-col items-center justify-start">
            <img src={LogoImg} alt="Logo" className="w-15 h-15 fixed-center"/>
             */}
            <header className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg max-w-md mx-auto z-10"> 
              <div className="flex items-center justify-center h-screen">
                <div className="text-center mt-10">
                  <h1 className="text-teal-600 text-3xl font-bold font-sans">Welcome to TALKConnect!</h1>
                  <p className="text-teal-500 mt-4">Pioneers in engaging volunteers for the healthcare community.</p><br/>
                  <Link to="/events">
                    <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300">
                        Find Opportunities
                    </button>
                  </Link>
                </div>
              </div>
            </header>
          
            <main className="mt-8">
              <section>
              </section>
  
              <section>
                <h2></h2>
                <p></p>
              </section>
  
              <section>
                <h2></h2>
                <p></p>
              </section>
            </main>
  
            <footer className="text-center py-4">
              <p>© 2024 TALKConnect. All rights reserved.</p>
            </footer>
          {/*</div>*/}
         </div>  
      </div>
    );
  };
  
  export default HomePage;

 