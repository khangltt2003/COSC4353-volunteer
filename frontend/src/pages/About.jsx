import React, { useEffect, useRef } from 'react';
import volunteer from "../assets/volunteer.jpeg";

const About = () => {
  const fadeInRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); 
          observer.unobserve(entry.target); 
        }
      });
    }, options);

    fadeInRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* About Us Section */}
        <section className="text-center mb-16 fade-in" ref={el => fadeInRefs.current[0] = el}>
          <h1 className="text-4xl font-bold text-teal-600 mb-4">About Us</h1>
          <h2 className="text-xl font-bold text-teal-600 text-center">"A Volunteering Platform made by Volunteers for Volunteers..."</h2>
              <div className="bg-white-100 p-4 rounded-lg max-w-2xl mx-auto">
                <p className="text-teal-600 text-center">
                  Founded in 2024, we are a passionate team of volunteers dedicated to providing the best services to our healthcare community. 
                  Our mission is to connect and find individuals who want to support their local healthcare community.
                </p>
                </div>
        </section>

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 fade-in" ref={el => fadeInRefs.current[1] = el}></h2>
            <div className="bg-white p-6 rounded-lg shadow-lg fade-in" ref={el => fadeInRefs.current[2] = el}>
            <img src={volunteer} alt="Team Member 1" className="mx-auto mb-4 h-auto" /> </div>
       

        {/* Call-to-Action Section */}
        <section className="text-center py-8 bg-teal-600 text-white rounded-lg fade-in" ref={el => fadeInRefs.current[3] = el}>
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg mb-6">Want to learn more or join our team? We’d love to hear from you!</p>
          <a href="/contact" className="px-6 py-3 bg-white text-teal-600 rounded-full font-semibold hover:bg-gray-100">
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
