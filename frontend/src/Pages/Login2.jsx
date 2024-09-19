import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../assets/loginmed.jpg";
import LogoImg from "../assets/Logo.jpg";
import { BiUser } from "react-icons/bi";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

export default function Login2() {
  const { login } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const status = await login(loginData);
    
    if (status === 200) {
      if (rememberMe) {
        localStorage.setItem("userToken", loginData.email); 
        sessionStorage.removeItem("userToken"); 
      } else {
        sessionStorage.setItem("userToken", loginData.email);
        localStorage.removeItem("userToken"); 
      }
      navigate("/profile");
    } else {
      setError("Incorrect email or password");
    }
    // if (email === "admin" && password === "pass") {
    //   setError("");
    //   alert("Login successful!");

    //   // Fake token
    //   const mockToken = "mock-token-123";

    //   if (rememberMe) {
    //     localStorage.setItem("userToken", mockToken);
    //     sessionStorage.removeItem("userToken"); // Ensure sessionStorage is cleared
    //   } else {
    //     sessionStorage.setItem("userToken", mockToken);
    //     localStorage.removeItem("userToken"); // Ensure localStorage is cleared
    //   }

    //   navigate("/");
    // } else {
    //   setError("Incorrect email or password");
    // }
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
          className="form-large-text max-w-[90%] lg:w-[30%] sm:max-w-[55%] w-full max-h-[90%] sm:max-h-[70%] h-[70%] mx-auto bg-white p-4 sm:p-6 rounded-lg  shadow-slate-800 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-1xl sm:text-2xl md:text-4xl text-main font-bold text-center mb-5  mt-2 sm:mt-8">TALKConnect</h1>

          <div className="relative mb-2">
            <label className="flex flex-col py-2 text-base ">Email</label>
            <div className="relative">
              <input
                className="w-full border p-2 rounded-lg "
                type="text"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <BiUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>

          <div className="relative mb-4">
            <label className="flex flex-col py-2 ">Password</label>
            <div className="relative mb-2">
              <input
                className="w-full border p-2 rounded-lg  "
                type={visible ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600">
                {visible ? <FaEyeSlash onClick={() => setVisible(!visible)} /> : <FaEye onClick={() => setVisible(!visible)} />}
              </div>
            </div>
          </div>

          <button className="border w-full my-3 py-2 sm:py-3 rounded-lg bg-main hover:bg-cyan-500 text-white" type="submit">
            Login
          </button>

          {error && <p className="text-red-500 text-center ">{error}</p>}

          <div className="flex justify-between mt-5">
            <p className="">
              <input type="checkbox" checked={rememberMe} onChange={handleCheckboxChange} /> Remember Me
            </p>
          </div>

          <p className="text-center mt-6 sm:mt-10">
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