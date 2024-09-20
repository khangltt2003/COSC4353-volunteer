import React from 'react';
import { useNavigate } from 'react-router-dom';

const Save = () => {
  // a page tell the event is saved successfully
    return (
  <div className="flex items-center justify-center min-h-screen">
    <button className="pl-3 text-left rounded-md border-2 shadow-md bg-slate-50 w-96 h-80 font-light">
      <div className="flex justify-center items-center mb-4">
          <img src="/check.PNG" alt="success Image" className="w-28 h-auto" /> {/* Match Image */}
      </div>
  
      <div className = "space-y-12"></div>
  
      <p className="flex justify-center items-center text-slate-950 font-bold">
        Event being saved! 
      </p>
    </button>
  </div>
    );
  };
  
  export default Save;