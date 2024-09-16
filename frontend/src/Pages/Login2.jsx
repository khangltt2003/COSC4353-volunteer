import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../assets/loginmed.jpg";
import LogoImg from "../assets/Logo.jpg";
import { BiUser } from "react-icons/bi";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Login2() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "pass") {
      setError("");
      alert("Login successful!");

      // Fake token
      const mockToken = "mock-token-123";

      if (rememberMe) {
        localStorage.setItem("userToken", mockToken);
        sessionStorage.removeItem("userToken"); // Ensure sessionStorage is cleared
      } else {
        sessionStorage.setItem("userToken", mockToken);
        localStorage.removeItem("userToken"); // Ensure localStorage is cleared
      }

      navigate("/");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#4a5568]">
      <img className="absolute w-full h-full object-cover mix-blend-overlay" src={LoginImg} alt="Login" />
      <Link to="/">
        <button className="absolute top-4 left-4 z-10 hover:shadow-lg transition-transform duration-300 rounded-full hover:scale-110">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-cyan-800 rounded-full blur-lg shadow-lg w-24 h-24" />
          </div>
          <img className="relative w-24 h-24 rounded-full object-cover" src={LogoImg} alt="Logo" />
        </button>
      </Link>
      {/* <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-cyan-700 rounded-lg blur-lg shadow-xl w-full max-w-[505px] h-full max-h-[705px]"></div>
      </div> */}
      <div className="relative flex justify-center items-center min-h-screen">
        <form
          className="form-large-text max-w-[90%] lg:w-[30%] sm:max-w-[55%] w-full max-h-[90%] sm:max-h-[700px] h-[70%] mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-1xl sm:text-2xl md:text-4xl text-main font-bold text-center mb-5  mt-2 sm:mt-8">TALKConnect</h1>

          <div className="relative mb-2">
            <label className="flex flex-col py-2 text-base sm:text-lg">Username</label>
            <div className="relative">
              <input
                className="w-full border p-2 rounded-lg text-sm sm:text-base"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
              <BiUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>

          <div className="relative mb-4">
            <label className="flex flex-col py-2 text-base sm:text-lg">Password</label>
            <div className="relative mb-2">
              <input
                className="w-full border p-2 rounded-lg text-sm sm:text-base"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600">
                {visible ? <FaEyeSlash onClick={() => setVisible(!visible)} /> : <FaEye onClick={() => setVisible(!visible)} />}
              </div>
            </div>
          </div>

          <button className="border w-full mt-8 py-2 sm:py-3 rounded-lg bg-main hover:bg-cyan-500 text-white text-sm sm:text-base" type="submit">
            Login
          </button>

          {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}

          <div className="flex justify-between mt-5">
            <p className="text-sm sm:text-base">
              <input type="checkbox" checked={rememberMe} onChange={handleCheckboxChange} /> Remember Me
            </p>
          </div>

          <p className="text-center mt-6 sm:mt-10 text-sm sm:text-base">
            <span>
              Not a Member?{" "}
              <Link to="/register" className="text-main hover:text-blue-400">
                Create an Account
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
