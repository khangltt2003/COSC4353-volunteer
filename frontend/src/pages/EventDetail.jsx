import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";
import EventUpdateModal from "../components/EventUpdateModal";
import AuthContext from "../../context/AuthContext";
import ProfileHook from "../../context/ProfileHook";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { profile, profileLoaded } = ProfileHook();

  useEffect(() => {
    const getEvent = async () => {
      const response = await axios({
        method: "GET",
        url: `/event/${id}/`,
      });
      setEvent(response.data);
      setIsLoading(false);
    };
    getEvent();
  }, [id]);

  useEffect(() => {
    if (profileLoaded && profile.applied_events.some((event) => event.id === Number(id))) {
      setIsApplied(true);
      return;
    }
    if (profileLoaded && profile.joined_events.some((event) => event.id === Number(id))) {
      setIsJoined(true);
      return;
    }
  }, [id, profile, profileLoaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApply = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: `/event/${id}/apply/`,
      });
      if (response.status === 200) {
        alert("successfully applied");
        setIsApplied(true);
      }
    } catch (err) {
      console.log(("cannot apply", err));
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      updatedEvent.skill_ids = updatedEvent.skills_needed.map((skill) => skill.id);
      await axios({
        method: "PUT",
        url: `/event/${id}/`,
        data: updatedEvent,
      });
      setIsUpdateModalOpen(false);
      alert("Successfully updated event");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `/event/${id}/`,
      });
      alert("successfully deleted event");
      navigate("/event");
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: `/event/${id}/leave/`,
      });
      if (response.status === 200) {
        alert("successfull withdrew from event");
        setIsApplied(false);
        setIsJoined(false);
      }
    } catch (err) {
      console.log("cannot withdraw from event", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-[50px]"></div>
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 mx-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="relative">
            {/* only for admin */}
            <div className="absolute top-0 right-0 flex flex-col md:flex-row gap-2">
              {user && user.is_staff && (
                <>
                  <button className="bg-teal-600 p-2 text-white rounded hover:bg-teal-700" onClick={() => setIsUpdateModalOpen(true)}>
                    Update
                  </button>
                  <button className="bg-red-600 p-2 text-white rounded hover:bg-red-700" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
              {/* for applicants and participants */}
              {(isApplied || isJoined) && (
                <button className="bg-red-600 p-2 text-white rounded hover:bg-red-700" onClick={handleWithdraw}>
                  Withdraw
                </button>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-4">{event.name}</h1>
            <p className="text-gray-700 mb-6">{event.description}</p>

            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-2">Event Details</h2>
              <p className="text-gray-600">
                <strong>Address:</strong> {event.address}, {event.city}, {event.state} {event.zipcode}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="text-gray-600">
                <strong>Urgency:</strong> {event.urgency.charAt(0).toUpperCase() + event.urgency.slice(1)}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-teal-600 mb-2">Skills Needed</h2>
              <ul className="list-disc list-inside text-gray-700">
                {event.skills_needed.length === 0 ? (
                  <p>This event does not require any specific skills.</p>
                ) : (
                  event.skills_needed.map((skill) => <li key={skill.id}>{skill.name}</li>)
                )}
              </ul>
            </div>

            <div className="mt-6">
              {!isApplied && !isJoined ? (
                <button onClick={() => handleApply()} className="bg-teal-600 text-white px-4 py-2 rounded shadow-md hover:bg-teal-700 transition">
                  Apply
                </button>
              ) : (
                <>
                  {isApplied && <button className="bg-while border border-teal-600 text-teal-600 px-4 py-2 rounded shadow-md ">Applied</button>}
                  {isJoined && <button className="bg-while border border-teal-600 text-teal-600 px-4 py-2 rounded shadow-md ">Joined</button>}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {!isLoading && (
        <EventUpdateModal event={event} isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} onUpdate={handleUpdateEvent} />
      )}
    </div>
  );
};

export default EventDetail;
