import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import Login2 from './Pages/Login2';
import HomePage from './Pages/Homepage';


function App() {
  return (
    <Router>
      <div>
         <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<Login2 />} />
        {/*<Route path="/Register" element={<Register />} />*/}
      </Routes>
      </div>
    </Router>
  )

}
export default App;
