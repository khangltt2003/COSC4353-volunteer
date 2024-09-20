import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import matchImg from "../assets/match.png";

const VolunteerMatch = () => {
  const skillsData = {
    "Volunteer 1": {
      name: "Alice Johnson",
      skill: "Dental",
    },
    "Volunteer 2": {
      name: "Bob Smith",
      skill: "Nurse",
    },
    "Volunteer 3": {
      name: "Carol Davis",
      skill: "Pharmacy Tech",
    },
  };

  const eventsData = {
    Dental: "Dental Event",
    Nurse: "Nurse Event",
    "Pharmacy Tech": "Tech Event",
  };

  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    event: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleVolunteerChange = (e) => {
    const volunteerKey = e.target.value;

    setSelectedVolunteer(volunteerKey);

    if (skillsData[volunteerKey]) {
      const { name, skill } = skillsData[volunteerKey];
      setFormData({
        name: name,
        event: eventsData[skill] || "",
      });
      setError("");
    } else {
      setFormData({
        name: "",
        event: "",
      });
    }
  };

  const handleSubmit = () => {
    if (!selectedVolunteer) {
      setError("Please select a volunteer before proceeding.");
    } else {
      setError("");
      navigate("/match");
    }
  };

  return (
    <div className="relative min-h-screen font-black space-y-16 bg-cover bg-center bg-[url('/Match.png')]">
      <div className="absolute left-0 bottom-0 p-4">
        <img src={matchImg} alt="Match Image" className="max-w-xl h-auto" />
      </div>

      <div className="flex justify-end items-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center h-full bg-stone-50 rounded-lg p-6">
            <div className="space-y-4 w-full">
              {/* Number Dropdown */}
              <div>
                <label htmlFor="volunteer" className="block text-gray-700 font-semibold mb-2">
                  Select a Volunteer
                </label>
                <select
                  id="volunteer"
                  value={selectedVolunteer}
                  onChange={handleVolunteerChange}
                  className={`pl-3 pr-4 text-left rounded-md border-2 w-72 h-12 font-light placeholder-slate-400 ${
                    error ? "border-red-500" : "border-gray-600"
                  }`}
                >
                  <option value="" disabled>
                    Select a Volunteer *
                  </option>
                  <option value="Volunteer 1">Volunteer 1</option>
                  <option value="Volunteer 2">Volunteer 2</option>
                  <option value="Volunteer 3">Volunteer 3</option>
                </select>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>

              {/* Auto-filled Name and Event */}
              <div className="flex flex-col space-y-4 mt-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Volunteer Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    readOnly
                    className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                  />
                </div>

                <div>
                  <label htmlFor="event" className="block text-gray-700 font-semibold mb-2">
                    Matched Event
                  </label>
                  <input
                    type="text"
                    id="event"
                    name="event"
                    value={formData.event}
                    readOnly
                    className="w-full px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="transition ease-in-out delay-500 hover:-translate-y-1 hover:scale-110 hover:bg-sky-500 duration-100 pl-3 rounded-full bg-cyan-600 w-60 h-12 font-extrabold"
              >
                <p className="text-slate-50">Save</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatch;
