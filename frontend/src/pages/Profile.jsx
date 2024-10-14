import { useContext, useEffect, useState } from "react";
// import AuthContext from "../../context/AuthContext";
import AuthContext from "../../context/AuthContext";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import EventBoard from "../components/EventBoard";
import Loading from "../components/Loading";
import states from "../utils/states";
import { useSkill } from "../../context/SkillContext";

const Profile = () => {
  const { authTokens } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    fullname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    preferences: "",
    skills: [],
    availability: [],
    events: [],
  });
  // const [profileLoaded, setProfileLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSkill, setSelectedSkill] = useState({ id: null, name: "" });

  const [activeTab, setActiveTab] = useState("profile");

  const { allSkills } = useSkill();
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
      setProfile(profile);
    }
  }, [profile, isLoading]);

  const handleSubmit = async () => {
    try {
      profile.skill_ids = profile.skills.map((skill) => skill.id);
      await axios({
        method: "PATCH",
        url: `/user/profile/`,
        data: profile,
      });
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
      alert(`Failed to update profile: ${error.response.data.message || error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDate = () => {
    if (selectedDate) {
      console.log(selectedDate);
      setProfile((prev) => ({ ...prev, availability: [...prev.availability, selectedDate] }));
      setSelectedDate("");
    }
  };

  const handleRemoveDate = (index) => {
    console.log(index);
    setProfile((prev) => ({ ...prev, availability: prev.availability.filter((d, i) => i != index) }));
  };

  const handleAddSkill = () => {
    if (selectedSkill && !profile.skills.some((el) => el.id === selectedSkill.id)) {
      console.log(selectedSkill);
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, selectedSkill],
      }));
    }
    setSelectedSkill("");
  };

  const handleRemoveSkill = (id) => {
    setProfile((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id != id) }));
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <section className="bg-gray-100 flex justify-center min-h-screen">
      <div className="w-[95%] md:max-w-[95%] lg:max-w-[80%]  bg-white  rounded-lg p-4 sm:p-6 md:p-8 flex flex-col md:flex-row shadow-teal-600 shadow-2xl my-4">
        <div className="w-full md:w-1/6 flex flex-row md:flex-col  items-center gap-4 border-r border-gray-300 pr-8">
          <button
            className={` text-lg ${activeTab === "profile" ? "font-semibold text-teal-600 " : "text-gray-500 hover:text-teal-600"}`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="bx bx-user md:mr-2"></i>
            <span className="">Your Profile</span>
          </button>
          <button
            className={`text-lg ${activeTab === "events" ? "font-semibold text-teal-600 " : "text-gray-500 hover:text-teal-600"}`}
            onClick={() => setActiveTab("events")}
          >
            <i className="bx bx-calendar-event md:mr-2"></i>
            <span className="">Your Events</span>
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-4/5 pl-8 ">
            {activeTab === "profile" ? (
              <>
                <h3 className="text-2xl font-bold  mb-3">{isEditing ? "Edit Your Profile" : "Profile"}</h3>
                <hr className="mb-3" />
                <div className="space-y-3">
                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6 ">Fullname:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      name="fullname"
                      value={profile.fullname}
                      onChange={handleInputChange}
                      className="w-full md:w-5/6 flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6">Address 1:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      name="address1"
                      value={profile.address1}
                      onChange={handleInputChange}
                      className="w-full md:w-5/6 flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6 ">Address 2:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      name="address2"
                      value={profile.address2}
                      onChange={handleInputChange}
                      className="w-full md:w-5/6 flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6 ">City:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      name="city"
                      value={profile.city}
                      onChange={handleInputChange}
                      className="w-full md:w-5/6 flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>

                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6 ">State:</label>
                    <select
                      disabled={isEditing ? false : true}
                      name="state"
                      value={profile.state}
                      onChange={handleInputChange}
                      className="w-full md:w-5/6 flex-grow p-2 border rounded border-gray-300 text-sm"
                    >
                      <option value="">Select a state</option>
                      {states.map(({ code, name }) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6">Zip Code:</label>
                    <input
                      type="text"
                      disabled={isEditing ? false : true}
                      name="zipcode"
                      value={profile.zipcode}
                      onChange={handleInputChange}
                      className="w-full md:w-5/6 flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>
                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label htmlFor="preferences" className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6 ">
                      Preferences:
                    </label>
                    <textarea
                      id="preferences"
                      disabled={isEditing ? false : true}
                      name="preferences"
                      value={profile.preferences}
                      onChange={handleInputChange}
                      className="w-full md:w-5/6 flex-grow p-2 border rounded border-gray-300 text-sm"
                    />
                  </div>

                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6 ">Skills:</label>
                    <div className="flex gap-3 w-5/6 flex-wrap border-gray-300 text-sm">
                      {profile.skills.map((el) => {
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
                    <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                      <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6 ">Add Skill:</label>

                      <select
                        disabled={isEditing ? false : true}
                        value={selectedSkill ? selectedSkill.id : ""}
                        onChange={(e) => {
                          const skill = allSkills.find((s) => s.id === parseInt(e.target.value));
                          setSelectedSkill(skill);
                        }}
                        className=" md:w-4/6 flex-grow p-2 border rounded border-gray-300 text-sm mr-4 "
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
                        className="px-2 py-1 bg-teal-600 text-white rounded text-sm transition-transform transform hover:scale-105"
                      >
                        Add
                      </button>
                    </div>
                  )}

                  <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                    <label className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6">Current Availability:</label>
                    <div className="flex gap-3 w-5/6 flex-wrap border-gray-300 text-sm">
                      {profile.availability.map((el, i) => {
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
                    <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
                      <label htmlFor="datePicker" className="block font-bold text-sm mb-0 mr-2 w-full  md:w-1/6">
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
              <EventBoard appliedEvents={profile.applied_events} joinedEvents={profile.joined_events} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
