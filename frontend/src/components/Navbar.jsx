import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger and close icons
import handlogo from "../assets/handlogo.jpg";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname.toLocaleLowerCase())) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="flex items-center justify-between h-16 mx-auto px-4 ">
        {/*Logo and Website name*/}
        <Link to="/" className="flex items-center">
          <img src={handlogo} alt="Logo" className="h-15 w-12 center" />
          <span className="text-2xl font-bold text-[#14B8A6] md:block hidden ">TALKConnect</span>
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-teal-600 focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden md:flex space-x-8">
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
            <Link to="/notifications" className="text-teal-600 hover:text-gray-300">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-teal-600 hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-teal-600 hover:text-gray-300">
              Profile
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

        {isOpen && (
          <div className="md:hidden absolute top-[80px] left-0 w-full bg-white shadow-md py-4 z-50">
            <ul className="flex flex-col items-center space-y-4">
              <li>
                <Link to="/" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/event" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/notifications" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                  Notifications
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                {user ? (
                  <p
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="text-teal-600 hover:text-gray-300 cursor-pointer"
                  >
                    Log Out
                  </p>
                ) : (
                  <Link to="/login" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                    Log In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
