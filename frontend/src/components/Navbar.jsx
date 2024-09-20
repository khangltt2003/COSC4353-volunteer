import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import handlogo from "../assets/handlogo.jpg";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname.toLocaleLowerCase())) {
    return null;
  }
  let hideDropdownTimeout;

  return (
    <div className="bg-white-300">
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
            <Link to="/events" className="text-teal-600 hover:text-gray-300">
              Events
            </Link>
          </li>
          <li>
            <Link to="/recruit" className="text-teal-600 hover:text-gray-300">
              Recruit
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

          {/* Dropdown Menu for login starts here */}

          <li
            className="relative"
            onMouseEnter={() => {
              clearTimeout(hideDropdownTimeout);
              setDropdown(true);
            }}
            onMouseLeave={() => {
              hideDropdownTimeout = setTimeout(() => setDropdown(false), 200); // Delay closing by 200ms
            }}
          >
            <Link to="/login" className="text-teal-600 hover:text-gray-300">
              Log In
            </Link>

            {dropdown && (
              <ul className="absolute top-12 right-0 bg-white border rounded-md shadow-lg py-2 space-y-2 z-10">
                <li>
                  <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
