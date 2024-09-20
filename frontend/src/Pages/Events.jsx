import { useState } from "react";
import pharmacyImg from "../assets/pharmacy.png";
import nurseImg from "../assets/nurse.png";
import dentalImg from "../assets/dental.png";
const Events = () => {
  // Sample event data
  const event = [
    {
      name: "Dental Event 2024",
      image: dentalImg,
      date: "Sep 20 2024",
      location: "Sample Address, City, State",
      description: "Dental Care for the elderly",
    },
    {
      name: "Nurse Event 2024",
      image: nurseImg,
      date: "Oct 10 2024",
      location: "Sample Address, City, State",
      description: "Nursing services for senior citizens",
    },
    {
      name: "Pharmacy Tech Event 2024",
      image: pharmacyImg,
      date: "Nov 17 2024",
      location: "Sample Address, City, State",
      description: "Pharmacy technician assistance program",
    },
  ]; // event array

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = [];
  for (const eventItem of event) {
    if (eventItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || eventItem.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredEvents.push(eventItem);
    }
  }

  return (
    <div className="w-[100%] min-h-screen font-black space-y-16 bg-cover bg-center flex flex-col items-center">
      <div className="w-screen  flex items-center justify-center text-main ">
        <p className="text-5xl mr-4">Volunteers Events</p>
      </div>
      <div className="w-[50%]">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 font-medium rounded-lg border-[100%] border-2 border-main outline-none focus:border-cyan-700"
        />

        <div className="flex flex-col space-y-6 py-6 max-w-screen-xl mx-auto">
          {filteredEvents.map(
            (
              eventItem,
              index // file item base on the searching
            ) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex w-full  mx-auto">
                <img src={eventItem.image} alt={eventItem.name} className="w-48 h-48 object-cover rounded-md" />
                <div className="ml-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold">{eventItem.name}</h3> {/* event details */}
                  <p className="text-gray-600">Date: {eventItem.date}</p>
                  <p className="text-gray-600 mt-2">{eventItem.description}</p>
                  <p className="text-gray-600 mt-2 font-light">Location: {eventItem.location}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
