import { useContext, useEffect, useState } from "react";
// import AuthContext from "../../context/AuthContext";
import UserImg from "../assets/User.png";
import axios from "axios";

const states = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" },
  { code: "PR", name: "Puerto Rico" },
];

const Profile = () => {
  // const { authTokens } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [fullName, setFullName] = useState("asdf");
  const [addressOne, setAddressOne] = useState("asdf");
  const [addressTwo, setAddressTwo] = useState("asdf");
  const [city, setCity] = useState("asdf");
  const [state, setState] = useState("asdf");
  const [zipCode, setZipCode] = useState("asdf");
  const [preferences, setPreferences] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [email, setEmail] = useState("asdf");
  const [bio, setBio] = useState("asdf");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(["09-25-2024", "02-15-2024"]);

  // useEffect(() => {
  //   const getProfile = async () => {
  //     try {
  //       const response = await axios({
  //         method: "GET",
  //         url: `${import.meta.env.VITE_SERVER_URL}/user/profile/`,
  //         headers: {
  //           Authorization: `Bearer ${authTokens.access}`,
  //         },
  //       });
  //       setProfile(response.data);
  //       setProfileLoaded(true);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   getProfile();
  // }, [authTokens.access]);

  // useEffect(() => {
  //   if (profileLoaded && profile) {
  //     setFullName(profile.fullname || "");
  //     setAddressOne(profile.address1 || "");
  //     setAddressTwo(profile.address2 || "");
  //     setCity(profile.city || "");
  //     setState(profile.state || "");
  //     setZipCode(profile.zipcode || "");
  //     setPreferences(profile.preference || []);
  //     setAvailability(profile.availability || []);
  //     setEmail(profile.user.email || "");
  //     setBio(profile.bio || "");
  //     setIsLoading(false);
  //   }
  // }, [profile, profileLoaded]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleZipChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    setZipCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   try {
    //     await axios({
    //       method: "PUT",
    //       url: `${import.meta.env.VITE_SERVER_URL}/user/profile/`,
    //       headers: {
    //         Authorization: `Bearer ${authTokens.access}`,
    //         "Content-Type": "application/json",
    //       },
    //       data: {
    //         fullname: fullName,
    //         address1: addressOne,
    //         address2: addressTwo,
    //         city: city,
    //         state: state,
    //         zipcode: zipCode,
    //         preference: preferences,
    //         availability: availability,
    //         user: {
    //           email: email,
    //           bio: bio,
    //         },
    //       },
    //     });
    //     alert("Profile updated successfully!");
    //   } catch (error) {
    //     console.error("Error updating profile:", error.response.data);
    //     alert(`Failed to update profile: ${error.response.data.message || error.message}`);
    //   }
  };

  const handleAddDate = () => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}-${String(dateObj.getMonth() + 1).padStart(
        2,
        "0"
      )}-${dateObj.getFullYear()}`;
      setAvailability([...availability, formattedDate]);
      setSelectedDate("");
    }
  };

  const handleRemoveDate = (dateToRemove) => {
    setAvailability(availability.filter((date) => date !== dateToRemove));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="bg-[#6E6E6E] flex items-center justify-center">
      <div className="w-full max-w-[85%] bg-white max-h-[95%] h-full rounded-lg p-8 flex  shadow-teal-600 shadow-2xl">
        <div className="w-1/5 flex flex-col  items-center border-r border-gray-300 pr-8">
          <img src={UserImg} alt="Profile" className="w-48 h-48 rounded-full border-1 border-black mb-4 mt-6" />
          <p className="text-xl font-semibold">{email}</p>
          <input
            type="text"
            value={bio}
            onChange={handleInputChange(setBio)}
            placeholder="Enter your bio..."
            className="mt-2 w-full p-2 border rounded border-gray-300 text-sm"
          />
        </div>
        <div className="w-3/4 pl-8 ">
          <h3 className="text-4xl font-semibold mb-6">Edit Your Profile</h3>
          <hr className="mb-6" />
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: "Full Name", value: fullName, setter: setFullName },
              { label: "Address Line 1", value: addressOne, setter: setAddressOne },
              { label: "Address Line 2", value: addressTwo, setter: setAddressTwo },
              { label: "City", value: city, setter: setCity },
              { label: "State", value: state, setter: setState, type: "select" },
              { label: "Zip Code", value: zipCode, setter: handleZipChange },
            ].map(({ label, value, setter, type }, index) => (
              <div key={index} className="mb-4 flex items-center">
                <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">{label}:</label>
                {type === "select" ? (
                  <select value={value} onChange={handleInputChange(setter)} className="flex-grow p-2 border rounded border-gray-300 text-sm">
                    <option value="">Select a state</option>
                    {states.map(({ code, name }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={handleInputChange(setter)}
                    className="flex-grow p-2 border rounded border-gray-300 text-sm"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setter(value)}
                  className="ml-2 px-2 py-1 bg-teal-600 text-white rounded text-xs transition-transform transform hover:scale-105"
                >
                  Edit
                </button>
              </div>
            ))}
            <div className="md:col-span-2">
              <label htmlFor="preferences" className="block font-bold text-sm mb-2 ">
                Preferences:
              </label>
              <textarea
                id="preferences"
                value={preferences.join("\n")}
                onChange={(e) => setPreferences(e.target.value.split("\n"))}
                className="w-full p-1 border rounded border-gray-300 text-sm h-24"
              />
              <button
                type="button"
                onClick={() => setPreferences(preferences)}
                className="ml-2 px-2 py-1 bg-teal-600 text-white rounded text-xs transition-transform transform hover:scale-105"
              >
                Edit
              </button>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="datePicker" className="block font-bold text-sm mb-2">
                Add Availability Date:
              </label>
              <div className="flex items-center">
                <input
                  type="date"
                  id="datePicker"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className=" max-w-xs p-1 border rounded border-gray-300 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddDate}
                  className="ml-4 px-2 py-1 bg-teal-600 text-white rounded text-sm transition-transform transform hover:scale-105"
                >
                  Add
                </button>
              </div>

              <div className="mt-4">
                <label className="block font-bold text-sm mb-2">Current Availability</label>
                <select
                  className="max-w-xs p-1 border rounded border-gray-300 text-sm"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="" disabled>
                    Select a date
                  </option>
                  {availability.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
                {availability.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(selectedDate)}
                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded text-sm transition-transform transform hover:scale-105"
                  >
                    Remove Selected
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-end ">
              <button type="submit" className=" bg-teal-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
