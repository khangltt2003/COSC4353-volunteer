import { useEffect, useState } from "react";
import pharmacyImg from "../assets/pharmacy.png";
import nurseImg from "../assets/nurse.png";
import dentalImg from "../assets/dental.png";
import axios from "../axios";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getEvent = async () => {
      const response = await axios({
        method: "GET",
        url: "/event/",
      });
      setEvents(response.data);
      setIsLoading(false);
    };
    getEvent();
  }, []);

  const filteredEvents = [];
  for (const eventItem of events) {
    if (eventItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || eventItem.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredEvents.push(eventItem);
    }
  }

  return (
    <div className="w-[100%] min-h-screen space-y-16 bg-cover bg-center flex flex-col items-center">
      <div className="w-screen  flex items-center justify-center text-teal-600">
        <p className="text-5xl mr-4">Volunteer Events</p>
      </div>
      <div className="w-[50%]">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 font-medium rounded-lg border-[100%] border-2 border-teal-600 outline-none focus:border-teal-800"
        />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col space-y-6 py-6 max-w-screen-xl mx-auto">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
