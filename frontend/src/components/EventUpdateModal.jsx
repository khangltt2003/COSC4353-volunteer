import { useEffect, useState } from "react";
import states from "../utils/states";
import Loading from "./Loading";
import { useSkill } from "../../context/SkillContext";

const EventUpdateModal = ({ event, isOpen, onClose, onUpdate }) => {
  const [eventData, setEventData] = useState(event);
  const [errors, setErrors] = useState({});
  const [newSkill, setNewSkill] = useState(null);
  const { allSkills } = useSkill();

  const handleInputChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    if (newSkill && !eventData.skills_needed.some((skill) => skill.id === newSkill.id)) {
      setEventData({
        ...eventData,
        skills_needed: [...eventData.skills_needed, newSkill],
      });
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (id) => {
    setEventData({
      ...eventData,
      skills_needed: eventData.skills_needed.filter((skill) => skill.id !== id),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const newErrors = {};
    if (!eventData.name) newErrors.name = "Event name is required";
    if (!eventData.description) newErrors.description = "Event description is required";
    if (!eventData.address) newErrors.address = "Address is required";
    // Add other field validations as necessary

    if (Object.keys(newErrors).length === 0) {
      onUpdate(eventData);
    } else {
      setErrors(newErrors);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full min-h-screen bg-gray-900 bg-opacity-50 p-8">
      <div className="w-full max-w-lg bg-white shadow-md rounded-md relative overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 bg-teal-600 text-white">
          <h1 className="text-2xl font-bold">Update Event</h1>
          <button onClick={onClose} className="text-xl hover:bg-teal-700 rounded-full ">
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center">
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

            {/* Event Zipcode */}
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
                  {allSkills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>

                <button type="button" onClick={handleAddSkill} className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md">
                  Add
                </button>
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex gap-2 justify-between">
              <div className="w-full">
                <label className="text-gray-700 font-semibold">Time</label>
                <input
                  type="time"
                  name="time"
                  step="1"
                  value={eventData.time}
                  onChange={handleInputChange}
                  className={`w-full p-2 border-2 rounded-md ${errors.time ? "border-red-500" : "border-gray-300"}`}
                />
              </div>

              <div className="w-full">
                <label className="text-gray-700 font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
          </form>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end p-4 bg-gray-100 border-t border-gray-200">
          <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="ml-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventUpdateModal;
