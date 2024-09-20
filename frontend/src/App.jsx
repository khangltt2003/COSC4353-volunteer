import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactUs from './pages/ContactUs'
import Thankyou from './pages/Thankyou';
import EventForm from './pages/EventForm';
import Save from './pages/Save';
import VolunteerMatch from './pages/VolunteerMatch';
import MatchSave from './pages/MatchSave';
import History from './pages/History';
import Events from './pages/Events';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/volunteer" element={<VolunteerMatch />} />
        <Route path="/match" element={<MatchSave />} />
        <Route path="/save" element={<Save />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/submit" element={<Thankyou />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  )
}

export default App;
