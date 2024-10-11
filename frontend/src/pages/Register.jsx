import { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/loginmed.jpg";
import LogoImg from "../assets/Logo.jpg";
import { BiUser } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPassword = (password) => {
    if (password.length <= 8) {
      return false;
    }
    //check special character
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacterPattern.test(password)) {
      return false;
    }
    //check one number
    const numberPattern = /[0-9]/;
    if (!numberPattern.test(password)) {
      return false;
    }
    //check one capitalized character
    const capitalLetterPattern = /[A-Z]/;
    if (!capitalLetterPattern.test(password)) {
      return false;
    }
    return true;
  };

  const handleChage = (e) => {
    setError(null);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(data.email)) {
      setError("Invalid email");
      return;
    }

    if (!isValidPassword(data.password)) {
      return;
    }

    if (data.password != data.password2) {
      setError("Password does not match.");
      return;
    }
    try {
      await axios({
        method: "POST",
        url: "/user/register/",
        data: {
          email: data.email,
          password: data.password,
          password2: data.password2,
        },
      });
      setMessage("Account created successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Email is already used.");
    }
  };
  return (
    <div className="relative w-full h-screen bg-[#4a5568]">
      <img className=" absolute w-full h-full object-cover mix-blend-overlay" src={LoginImg} alt="Login" />
      <Link to="/homepage">
        <button className="absolute top-4 left-4 z-10 hover:shadow-lg transition-transform duration-300 rounded-full hover:scale-110">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-cyan-800 rounded-full blur-lg shadow-lg w-24 h-24" />
          </div>
          <img className=" relative w-24 h-24 rounded-full object-cover" src={LogoImg} alt="Logo" />
        </button>
      </Link>
      {/* <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-cyan-700 rounded-lg blur-lg shadow-xl w-full max-w-[505px] h-full max-h-[705px]" />
      </div> */}
      <div className="relative flex justify-center items-center min-h-screen ">
        <form
          className="form-large-text  lg:w-[30%] sm:max-w-[55%] w-full max-h-[90%]  sm:max-h-[70%] h-[70%] mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-slate-800 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className=" text-5xl text-main font-bold text-center mb-3 ">TALKConnect</h1>
          <div className="relative mb-2">
            <label className="flex flex-col sm:text-lg ">Email</label>
            <div className="relative">
              <input
                className="w-full border p-2 rounded-lg"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChage}
                placeholder="Enter your email"
              />
              <BiUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <div className="relative mb-2">
            <label className="flex flex-col sm:text-lg">Password</label>
            <div className="relative ">
              <input
                className="w-full border p-2 rounded-lg"
                type={visible ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChage}
                placeholder="Enter your password"
              />
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600">
                {visible ? <FaEyeSlash onClick={() => setVisible(!visible)} /> : <FaEye onClick={() => setVisible(!visible)} />}
              </div>
            </div>
          </div>
          <div className="relative mb-2">
            <label className="flex flex-col  sm:text-lg"> Confirm Password</label>
            <div className="relative">
              <input
                className="w-full border p-2 rounded-lg"
                type={visible ? "text" : "password"}
                name="password2"
                value={data.password2}
                onChange={handleChage}
                placeholder="Re-enter your password"
              />
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600">
                {visible ? <FaEyeSlash onClick={() => setVisible(!visible)} /> : <FaEye onClick={() => setVisible(!visible)} />}
              </div>
            </div>
          </div>
          <button className="border w-full my-3 py-3 rounded-lg bg-main hover:bg-cyan-500 text-white" type="submit">
            Sign Up
          </button>
          {data.password.length > 0 && (
            <PasswordChecklist
              className="text-sm"
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={5}
              value={data.password}
              valueAgain={data.password2}
              messages={{
                minLength: "Password must be more than 8 characters",
                specialChar: "Password must contain a special characters",
                number: "Password must contain a number",
                capital: "Password must contain a capitalize character",
                match: "Password does not match",
              }}
            />
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}
          <p className="text-center mt-5">
            <span>
              Already a Member?{" "}
              <Link to="/login" className="text-main hover:text-blue-400">
                {" "}
                Sign In{" "}
              </Link>{" "}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
