import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileHook from "../../context/ProfileHook";

const Events = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, profileLoaded } = ProfileHook();

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

  events.sort((a, b) => a.id - b.id);

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative px-4">
      <div className="w-full flex items-center justify-center text-teal-600 my-10 relative">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold">Volunteer Events</p>
        {user && user.is_staff && (
          <Link to="/event/manage">
            <button className="bg-teal-600 absolute top-0 right-0 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition">Manage Event</button>
          </Link>
        )}
      </div>
      <div className="w-full max-w-6xl ">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-full">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isApplied={profile?.applied_events.some((e) => e.id === event.id)}
                isJoined={profile?.joined_events.some((e) => e.id === event.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
