import { useContext, useEffect, useState } from "react";
// import AuthContext from "../../context/AuthContext";
import UserImg from "../assets/User.png";
import ProfileHook from "../../context/ProfileHook";
import AuthContext from "../../context/AuthContext";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import EventBoard from "../components/EventBoard";
import Loading from "../components/Loading";

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
  const { authTokens } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  // const [profileLoaded, setProfileLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [preferences, setPreferences] = useState("");
  const [skills, setSkills] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSkill, setSelectedSkill] = useState({ id: null, name: "" });

  const [activeTab, setActiveTab] = useState("profile");

  const [allSkills, setAllSkills] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/user/profile/`,
        });
        setProfile(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, [authTokens, navigate]);

  useEffect(() => {
    if (!isLoading && profile) {
      setFullName(profile.fullname || "");
      setAddress1(profile.address1 || "");
      setAddress2(profile.address2 || "");
      setCity(profile.city || "");
      setState(profile.state || "");
      setZipCode(profile.zipcode || "");
      setPreferences(profile.preferences || "");
      setSkills(profile.skills || []);
      setAvailability(profile.availability || []);
      setEvents(profile.events || []);
    }
  }, [profile, isLoading]);

  useEffect(() => {
    const getSkills = async () => {
      const response = await axios({
        method: "GET",
        url: "/skill/",
      });
      setAllSkills(response.data);
    };
    getSkills();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios({
        method: "PATCH",
        url: `/user/profile/`,
        data: {
          fullname: fullName,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zipcode: zipCode,
          preference: preferences,
          skill_ids: skills.map((s) => s.id),
          availability: availability,
        },
      });
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
      alert(`Failed to update profile: ${error.response.data.message || error.message}`);
    }
  };

  const handleAddDate = () => {
    if (selectedDate) {
      console.log(selectedDate);
      setAvailability([...availability, selectedDate]);
      setSelectedDate("");
    }
  };

  const handleRemoveDate = (index) => {
    console.log(index);
    setAvailability(availability.filter((date, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (selectedSkill && !skills.some((el) => el.id === selectedSkill.id)) {
      console.log(selectedSkill);
      setSkills([...skills, selectedSkill]);
    }
    setSelectedSkill("");
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((skill) => skill.id !== index));
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <section className="bg-gray-100 flex justify-center min-h-screen">
      <div className="w-full md:max-w-[90%] lg:max-w-[85%] xl:max-w-[75%] bg-white  rounded-lg p-4 sm:p-6 md:p-8 flex md:flex-row shadow-teal-600 shadow-2xl my-4">
        <div className="w-1/6 flex flex-col   items-center gap-4 border-r border-gray-300 pr-8">
          <button
            className={`  text-lg ${activeTab === "profile" ? "font-semibold text-teal-600 " : "text-gray-500 hover:text-teal-600"}`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="bx bx-user mr-2"></i>
            Your Profile
          </button>
          <button
            className={`text-lg ${activeTab === "events" ? "font-semibold text-teal-600 " : "text-gray-500 hover:text-teal-600"}`}
            onClick={() => setActiveTab("events")}
          >
            <i className="bx bx-calendar-event mr-2"></i>
            Your Events
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-4/5 pl-8 ">
            {activeTab === "profile" ? (
              <>
                <h3 className="text-2xl font-bold  mb-6">{isEditing ? "Edit Your Profile" : "Profile"}</h3>
                <hr className="mb-6" />
                <div className="space-y-6">
                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">Fullname:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">Address 1:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      className="flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">Address 2:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      className="flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">City:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">Zip Code:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">State:</label>
                    <select
                      disabled={isEditing ? false : true}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="flex-grow p-2 border rounded border-gray-300 text-sm"
                    >
                      <option value="">Select a state</option>
                      {states.map(({ code, name }) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4 flex items-center">
                    <label htmlFor="preferences" className="block font-bold text-sm mb-0 mr-2 w-1/6">
                      Preferences:
                    </label>
                    <textarea
                      id="preferences"
                      disabled={isEditing ? false : true}
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      className="flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>

                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6">Skills:</label>
                    <div className="flex gap-3 w-5/6 flex-wrap border-gray-300 text-sm">
                      {skills.map((el) => {
                        return (
                          <div className="border flex rounded p-2 bg-teal-600 text-white" key={el.id}>
                            {el.name}
                            {isEditing && (
                              <div className="ml-1" onClick={() => handleRemoveSkill(el.id)}>
                                <i className="bx bx-x rounded-full hover:bg-teal-800 "></i>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mb-4 flex items-center">
                      <label className="block font-bold text-sm mb-0 mr-2 w-1/6 ">Add Skill:</label>

                      <select
                        disabled={isEditing ? false : true}
                        value={selectedSkill ? selectedSkill.id : ""}
                        onChange={(e) => {
                          const skill = allSkills.find((s) => s.id === parseInt(e.target.value));
                          setSelectedSkill(skill);
                        }}
                        className="flex-grow p-2 border rounded border-gray-300 text-sm"
                      >
                        <option value="">Select a skill</option>
                        {allSkills.map((skill) => (
                          <option key={skill.id} value={skill.id}>
                            {skill.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="ml-4 px-2 py-1 bg-teal-600 text-white rounded text-sm transition-transform transform hover:scale-105"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  <div className="mb-4 flex items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-1/6">Current Availability:</label>
                    <div className="flex gap-3 w-5/6 flex-wrap border-gray-300 text-sm">
                      {availability.map((el, i) => {
                        return (
                          <div className="border flex rounded p-2 bg-teal-600 text-white" key={i}>
                            {el}
                            {isEditing && (
                              <div className="ml-1" onClick={() => handleRemoveDate(i)}>
                                <i className="bx bx-x rounded-full hover:bg-teal-800 "></i>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mb-4 flex items-center">
                      <label htmlFor="datePicker" className="block font-bold text-sm mb-0 mr-2 w-1/6">
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
                    </div>
                  )}
                  <div className="flex justify-end gap-4 ">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => handleCancel()}
                          className=" bg-teal-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isEditing ? false : true}
                          type="submit"
                          onClick={() => handleSubmit()}
                          className=" bg-teal-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className=" bg-teal-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <EventBoard events={events} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
