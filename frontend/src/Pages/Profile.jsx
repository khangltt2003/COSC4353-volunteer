import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const states = [
  // State options as before
];

const Profile = () => {
  const { authTokens } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authTokens?.access) {
      console.log("No access token available.");
      return;
    }

    const getProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/profile/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        console.log("Profile data:", response.data);
        setProfile(response.data);
        setProfileLoaded(true);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, [authTokens?.access]);

  useEffect(() => {
    if (profileLoaded && profile) {
      setFullName(profile.fullname || '');
      setAddressOne(profile.address1 || '');
      setAddressTwo(profile.address2 || '');
      setCity(profile.city || '');
      setState(profile.state || '');
      setZipCode(profile.zipcode || '');
      setPreferences(profile.preference || []);
      setAvailability(profile.availability || []);
      setEmail(profile.user?.email || '');
      setIsLoading(false);
    }
  }, [profile, profileLoaded]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleZipChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    setZipCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/user/profile/`, {
        fullname: fullName,
        address1: addressOne,
        address2: addressTwo,
        city: city,
        state: state,
        zipcode: zipCode,
        preference: preferences,
        availability: availability,
        user: {
          email: email,
        },
      }, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange(setEmail)}
          disabled
        />
      </div>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={handleInputChange(setFullName)}
        />
      </div>
      <div>
        <label htmlFor="addressOne">Address Line 1:</label>
        <input
          type="text"
          id="addressOne"
          value={addressOne}
          onChange={handleInputChange(setAddressOne)}
        />
      </div>
      <div>
        <label htmlFor="addressTwo">Address Line 2:</label>
        <input
          type="text"
          id="addressTwo"
          value={addressTwo}
          onChange={handleInputChange(setAddressTwo)}
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleInputChange(setCity)}
        />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <select
          id="state"
          value={state}
          onChange={handleInputChange(setState)}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={handleZipChange}
        />
      </div>
      <div>
        <label htmlFor="preferences">Preferences:</label>
        <input
          type="text"
          id="preferences"
          value={preferences.join(', ')}
          onChange={(e) => setPreferences(e.target.value.split(', '))}
        />
      </div>
      <div>
        <label htmlFor="availability">Availability:</label>
        <input
          type="text"
          id="availability"
          value={availability.join(', ')}
          onChange={(e) => setAvailability(e.target.value.split(', '))}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;