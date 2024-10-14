import { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/loginmed.jpg";
import LogoImg from "../assets/Logo.jpg"; // Your logo image
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullname: "",
    address1: "",
    address2: "",
    city: "",
    zipcode: "",
    state: "",
    preference: "",
    skills: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/profile/create/", profileData); // Your API endpoint
      setMessage("Profile created successfully.");
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (err) {
      setError("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#4a5568]">
      <img className="absolute w-full h-full object-cover mix-blend-overlay" src={LoginImg} alt="Profile Background" />
      <Link to="/homepage">
        <button className="absolute top-4 left-4 z-10 hover:shadow-lg transition-transform duration-300 rounded-full hover:scale-110">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="bg-cyan-800 rounded-full blur-lg shadow-lg w-24 h-24" />
          </div>
          <img className="relative w-24 h-24 rounded-full object-cover" src={LogoImg} alt="Logo" />
        </button>
      </Link>

      <div className="relative flex justify-center items-center min-h-screen ">
        <form
          className="lg:w-[30%] sm:max-w-[55%] w-full max-h-[90%] sm:max-h-[70%] h-[70%] mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-slate-800 shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-1xl sm:text-2xl md:text-4xl text-main font-bold text-center mb-5  mt-2 sm:mt-8">TALKConnect</h1>

          {/* Full Name */}
          <div className="relative mb-2">
            <label className="flex flex-col sm:text-lg">Full Name</label>
            <input
              className="w-full border p-2 rounded-lg"
              type="text"
              name="fullname"
              value={profileData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Address */}
          <div className="relative mb-2">
            <label className="flex flex-col sm:text-lg">Address Line 1</label>
            <input
              className="w-full border p-2 rounded-lg"
              type="text"
              name="address1"
              value={profileData.address1}
              onChange={handleChange}
              placeholder="Enter address line 1"
              required
            />
          </div>

          <div className="relative mb-2">
            <label className="flex flex-col sm:text-lg">Address Line 2</label>
            <input
              className="w-full border p-2 rounded-lg"
              type="text"
              name="address2"
              value={profileData.address2}
              onChange={handleChange}
              placeholder="Enter address line 2"
            />
          </div>

          {/* City, Zipcode, State */}
          <div className="grid grid-cols-3 gap-4">
            <div className="relative mb-2">
              <label className="flex flex-col sm:text-lg">City</label>
              <input
                className="w-full border p-2 rounded-lg"
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>

            <div className="relative mb-2">
              <label className="flex flex-col sm:text-lg">Zipcode</label>
              <input
                className="w-full border p-2 rounded-lg"
                type="text"
                name="zipcode"
                value={profileData.zipcode}
                onChange={handleChange}
                placeholder="Enter zipcode"
                required
              />
            </div>

            <div className="relative mb-2">
              <label className="flex flex-col sm:text-lg">State</label>
              <input
                className="w-full border p-2 rounded-lg"
                type="text"
                name="state"
                value={profileData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          {/* Preferences and Skills */}
          <div className="relative mb-2">
            <label className="flex flex-col sm:text-lg">Event Preference</label>
            <input
              className="w-full border p-2 rounded-lg"
              type="text"
              name="preference"
              value={profileData.preference}
              onChange={handleChange}
              placeholder="Enter event preference"
            />
          </div>

          <div className="relative mb-2">
            <label className="flex flex-col sm:text-lg">Skills</label>
            <input
              className="w-full border p-2 rounded-lg"
              type="text"
              name="skills"
              value={profileData.skills}
              onChange={handleChange}
              placeholder="Enter skills (comma-separated)"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}

          <button className="border w-full my-3 py-3 rounded-lg bg-main hover:bg-cyan-500 text-white" type="submit">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
