import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProfileHook from "../../context/ProfileHook";

const Events = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, profileLoaded } = ProfileHook();
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = +searchParams.get("page") || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    const getEvent = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          method: "GET",
          url: `/event/?page=${page}`,
        });
        setEvents(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 15));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    getEvent();
  }, [page]);

  const filteredEvents = events.filter((eventItem) => eventItem.name.toLowerCase().includes(searchTerm.toLowerCase()));

  filteredEvents.sort((a, b) => a.id - b.id);

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative px-4 mb-4">
      <div className="w-full flex items-center justify-center text-teal-600 my-10 relative">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold">Volunteer Events</p>
        {user && user.is_staff && (
          <div className="absolute top-0 right-0 flex gap-1">
            <Link to="/event/create">
              <button className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition">Create Event</button>
            </Link>
            <Link to="/event/manage">
              <button className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition">Manage Application</button>
            </Link>
          </div>
        )}
      </div>

      <div className="w-full max-w-6xl">
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
          <>
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

            <div className="flex justify-center items-center m-2 gap-2">
              <button
                disabled={page === 1}
                className="bg-teal-600 text-white w-[75px] py-1  rounded-lg hover:bg-teal-700 transition disabled:bg-gray-300"
                onClick={() => navigate(`/event/?page=${page - 1}`)}
              >
                Previous
              </button>

              <span className="text-lg font-medium text-teal-700">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                className="bg-teal-600 text-white w-[75px] py-1 rounded-lg hover:bg-teal-700 transition disabled:bg-gray-300"
                onClick={() => navigate(`/event/?page=${page + 1}`)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
