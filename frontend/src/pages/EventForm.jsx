import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../axios";
import Loading from "../components/Loading";
import states from "../utils/states";
import { useSkill } from "../../context/SkillContext";

const EventForm = () => {
  const navigate = useNavigate();
  const { allSkills } = useSkill();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    urgency: "",
    skills_needed: [],
    time: "",
    date: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: !value }));
  };

  // Add skill
  const handleAddSkill = () => {
    if (newSkill && !eventData.skills_needed.some((el) => el.id === newSkill.id)) {
      setEventData((prevData) => ({
        ...prevData,
        skills_needed: [...prevData.skills_needed, newSkill],
      }));
      setNewSkill("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (id) => {
    setEventData((prevData) => ({
      ...prevData,
      skills_needed: prevData.skills_needed.filter((skill) => skill.id !== id),
    }));
  };

  // Add availability date

  const handleSubmit = async (e) => {
    e.preventDefault();
    eventData.skill_ids = eventData.skills_needed.map((skill) => skill.id);
    const hasErrors = validateForm();
    if (!hasErrors) {
      try {
        setIsLoading(true);
        const response = await axios({
          method: "POST",
          url: "/event/create/",
          data: eventData,
        });
        console.log(response);
        setIsLoading(false);
        alert("Successfully create event");
        setTimeout(() => {
          navigate("/event");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error: Invalid input");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(eventData).forEach((key) => {
      if (!eventData[key] && key !== "skills_needed" && key !== "availabilityDates") {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-lg bg-white shadow-md p-6 rounded-md">
        <h1 className="text-2xl font-bold text-teal-600 mb-6 mx-auto">Create Event</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center ">
            {/* Event Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold">Event Name</label>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full p-2 border-2 rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-gray-700 font-semibold">Event Description</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                className={`mt-1 block w-full p-2 border-2 rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            {/* Event Address */}
            <div>
              <label className="block text-gray-700 font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={eventData.address}
                onChange={handleInputChange}
                className={`mt-1 block w-full p-2 border-2 rounded-md ${errors.address ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            {/* Event City */}
            <div>
              <label className="block text-gray-700 font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={eventData.city}
                onChange={handleInputChange}
                className={`mt-1 block w-full p-2 border-2 rounded-md ${errors.city ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            {/* Event State */}
            <div>
              <label className="block text-gray-700 font-semibold">State</label>
              <select value={eventData.state} name="state" onChange={handleInputChange} className="mt-1 block w-full p-2 border-2 rounded-md">
                <option value="">Select a state</option>
                {states.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                value={eventData.zipcode}
                onChange={handleInputChange}
                className={`mt-1 block w-full p-2 border-2 rounded-md ${errors.zipcode ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            {/* Urgency Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold">Urgency</label>
              <select
                name="urgency"
                value={eventData.urgency}
                onChange={handleInputChange}
                className={`mt-1 block w-full p-2 border-2 rounded-md ${errors.urgency ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="" disabled>
                  Select urgency
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Skills Needed */}
            <div>
              <label className="block text-gray-700 font-semibold">Skills:</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {eventData.skills_needed.map((skill) => (
                  <span key={skill.id} className="bg-teal-600 text-white py-1 px-3 rounded-full flex items-center">
                    {skill.name}
                    <button type="button" onClick={() => handleRemoveSkill(skill.id)} className="ml-2 text-white hover:text-red-200">
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center">
                <select
                  value={newSkill ? newSkill.id : ""}
                  onChange={(e) => {
                    const skill = allSkills.find((s) => s.id === parseInt(e.target.value));
                    setNewSkill(skill);
                  }}
                  className="w-full p-2 border-2 rounded-md border-gray-300 mr-1"
                >
                  <option value="" disabled>
                    Select a skill
                  </option>
                  {allSkills.map((skill) => {
                    return (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    );
                  })}
                </select>

                <button type="button" onClick={handleAddSkill} className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md">
                  Add
                </button>
              </div>
            </div>

            <div className="flex gap-2 justify-between">
              <div className="w-full">
                <label className="text-gray-700 font-semibold">Time </label>
                <input
                  type="time"
                  name="time"
                  step="1" // Enables seconds input without AM/PM
                  value={eventData.time}
                  onChange={handleInputChange}
                  placeholder="HH:MM:SS" // Placeholder to guide the user
                  className={`  w-full p-2 border-2 rounded-md ${errors.time ? "border-red-500" : "border-gray-300"}`}
                />
              </div>

              <div className="w-full">
                <label className=" text-gray-700 font-semibold">Date</label>
                <input type="date" name="date" onChange={handleInputChange} className="w-full p-2 border-2 border-gray-300 rounded-md" />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => navigate("/cancel")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md">
                Cancel
              </button>
              <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventForm;
