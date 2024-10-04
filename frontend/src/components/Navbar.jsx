import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import handlogo from "../assets/handlogo.jpg";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname.toLocaleLowerCase())) {
    return null;
  }

  return (
    <div className="bg-white-300 ">
      <nav className="flex items-center h-16 justify-between mx-auto px-2">
        {/*Logo and Website name*/}
        <Link to="/" className="flex items-center">
          <img src={handlogo} alt="Logo" className="h-15 w-12 center" />
          <span className="text-2xl font-bold text-[#14B8A6]">TALKConnect</span>
        </Link>

        {/*Navbar items start here, with dropdown menu for login option*/}
        <ul className="flex space-x-10">
          <li>
            <Link to="/" className="text-teal-600 hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/event" className="text-teal-600 hover:text-gray-300">
              Events
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-teal-600 hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="text-teal-600 hover:text-gray-300">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-teal-600 hover:text-gray-300">
              About
            </Link>
          </li>

          <li className="relative">
            {user ? (
              <p onClick={() => logout()} className="text-teal-600 hover:text-gray-300 cursor-pointer">
                Log Out
              </p>
            ) : (
              <Link to="/login" className="text-teal-600 hover:text-gray-300">
                Log In
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
