import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import Login2 from './Pages/Login2';
import Register from './Pages/Register';
import Homepage from './Pages/Homepage';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/loginpage" element={<Login2 />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  )
}
export default App;
