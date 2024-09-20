import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactUs from './components/ContactUs'
import Thankyou from './components/Thankyou';
import EventForm from './components/EventForm';
import Save from './components/Save';
import VolunteerMatch from './components/VolunteerMatch';
import MatchSave from './components/MatchSave';
import History from './components/History';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login2 from './Pages/Login2';
import HomePage from './Pages/Homepage';
import NotificationPage from './Pages/NotificationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/volunteer" element={<VolunteerMatch />} />
        <Route path="/match" element={<MatchSave />} />
        <Route path="/event" element={<EventForm />} />
        <Route path="/save" element={<Save />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/submit" element={<Thankyou />} />
      </Routes>
    
      <div>
         <Navbar /> 
         
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<Login2 />} />
         <Route path="/notifications" element={<NotificationPage />} /> 
        
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
      </div>
    </Router>
  )
}

export default App;

