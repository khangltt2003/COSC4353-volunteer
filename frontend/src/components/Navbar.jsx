import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaBell, FaUserCircle } from "react-icons/fa"; // Add bell and user icons
import handlogo from "../assets/handlogo.jpg";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { profile } = useContext(ProfileContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hideNavbarRoutes = ["/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname.toLocaleLowerCase())) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-white shadow-md flex justify-center">
      <div className="w-[100%] md:w-[90%]">
        <nav className="flex items-center justify-between h-16 mx-auto px-4">
          <Link to="/" className="flex items-center">
            <img src={handlogo} alt="Logo" className="h-15 w-12 center" />
            <span className="text-2xl font-bold text-[#14B8A6] md:block hidden">TALKConnect</span>
          </Link>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl text-teal-600 focus:outline-none">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <ul className="hidden md:flex space-x-8 text-[18px]">
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
              <Link to="/about" className="text-teal-600 hover:text-gray-300">
                About
              </Link>
            </li>

            {user ? (
              <>
                <li className="relative">
                  {profile?.notifications.reduce((t, n) => t + (n.is_read === false), 0) > 0 && (
                    <div className="absolute top-0 right-0 rounded-full p-[6px] bg-red-400"></div>
                  )}

                  <Link to="/notifications" className="text-teal-600 hover:text-gray-300">
                    <FaBell size={25} />
                  </Link>
                </li>
                <li className="relative">
                  <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                    <FaUserCircle size={25} className="text-teal-600" />
                  </div>
                  {dropdownOpen && (
                    <div className="absolute z-50 right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                      <Link to="/profile/?p=profile" className="block px-4 py-2 text-teal-600 hover:bg-gray-200" onClick={toggleDropdown}>
                        Your Profile
                      </Link>
                      <Link to="/profile/?p=event" className="block px-4 py-2 text-teal-600 hover:bg-gray-200" onClick={toggleDropdown}>
                        Your Events
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          toggleDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-teal-600 hover:bg-gray-200"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-teal-600 hover:text-gray-300">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-teal-600 hover:text-gray-300">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>

          {isOpen && (
            <div className="md:hidden absolute top-[80px] left-0 w-full bg-white shadow-md py-4 z-50">
              <ul className="flex flex-col items-center  space-y-4">
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
                  <Link to="/about" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                    Notifications
                  </Link>
                </li>

                {user ? (
                  <>
                    <li>
                      <Link to="/profile/?p=page" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile/?p=event" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                        My Events
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          toggleMenu();
                        }}
                        className="text-teal-600 hover:text-gray-300"
                      >
                        Log Out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                        Log In
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" onClick={toggleMenu} className="text-teal-600 hover:text-gray-300">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
