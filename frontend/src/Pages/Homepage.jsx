import React, { useState } from 'react';
import loginImg from '../assets/hearthand.jpg';
import LogoImg from '../assets/Logo.jpg';
import workers from '../assets/workers.jpg'


const HomePage = () => {
  return (
    <div>
        <nav class="bg-teal-600 p-6">
          <ul class="flex justify-end space-x-4">
            <li><a href="/" class="text-white hover:text-gray-300">Home</a></li>
            <li><a href="/events" class="text-white hover:text-gray-300">Events</a></li>
            <li><a href="/emergency" class="text-white hover:text-gray-300">Emergency</a></li>
            <li><a href="/login" class="text-white hover:text-gray-300">Log in</a></li>
            <li><a href="/register" class="text-white hover:text-gray-300">Sign up</a></li>
          </ul>
        </nav>

      <div
      style={{
        backgroundImage: `url(${workers})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="flex items-center justify-center"
      >
      
      <div className="bg-white text-teal-500 h-screen flex flex-col items-center justify-start">
          <img src={LogoImg} alt="Logo" className="w-15 h-15 fixed-center"/>
          <header>

              <div className='mt-10'>
                <h1 className="text-3xl font-bold font-sans">Welcome to TalkConnect!</h1>
                <p className="text-center">Pioneers in engaging volunteers for the healthcare community.</p>
              </div>

          </header>
        
          <main className="mt-8">
            <section>
              <div className="flex flex-col items-center justify-center">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">Find Opportunities</button>
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
            <p>© 2024 My Website. All rights reserved.</p>
          </footer>
        </div>
       </div>  
    </div>
  );
};

export default HomePage;