import { useNavigate } from "react-router-dom";
import pharmacyImg from "../assets/pharmacy.png";
import nurseImg from "../assets/nurse.png";
import dentalImg from "../assets/dental.png";

const event = [
  {
    name: "Dental Event 2024",
    image: dentalImg,
    date: "August 19 2024",
    location: "Sample Address, City, State",
    description: "Dental Care for the elderly",
  },
  {
    name: "Nurse Event 2024",
    image: nurseImg,
    date: "Jan 10 2024",
    location: "Sample Address, City, State",
    description: "Nursing services for senior citizens",
  },
  {
    name: "Pharmacy Tech Event 2024",
    image: pharmacyImg,
    date: "June 17 2024",
    location: "Sample Address, City, State",
    description: "Pharmacy technician assistance program",
  },
];

const History = () => {
  return (
    <div className="full-w w-screen font-black flex justify-center items-center ">
      <div className="w-[70%]">
        <p className=" full-w  text-main   text-3xl text-center ">Volunteer History</p>
        <div className="flex flex-col items-start ">
          <div className="flex flex-col space-y-6 py-6 max-w-screen-xl mx-auto">
            {event.map(
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
    </div>
  );
};

export default History;
