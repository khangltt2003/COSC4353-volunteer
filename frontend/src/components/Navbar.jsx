import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useLocation  } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const hideNavbarRoutes = ['/loginpage', '/Register'];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

      const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
      setIsLoggedIn(!!token);
          console.log('Checking token:', token);
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigate('/loginpage'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex justify-between">
        <li>
          <Link to="/" className="hover:text-cyan-500">Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile" className="hover:text-cyan-500">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-red-500">Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/loginpage" className="hover:text-cyan-500">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}