import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Events = () => {
  const { user } = useContext(AuthContext);
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
    <div className="w-full min-h-screen flex flex-col items-center relative px-4">
      {user && user.is_staff && (
        <Link to="/createevent">
          <button className="bg-teal-600 absolute top-3 right-4 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition">Create Event</button>
        </Link>
      )}

      <div className="w-full flex items-center justify-center text-teal-600 my-10">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold">Volunteer Events</p>
      </div>

      <div className="w-full max-w-2xl sm:w-3/4 md:w-2/3">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 font-medium rounded-lg border-2 border-teal-600 outline-none focus:border-teal-800"
        />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-6 py-6">
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
