import { useEffect, useState } from "react";
import axios from "../axios";
import { Link, useSearchParams } from "react-router-dom";
import UserProfileModal from "../components/UserProfileModal";
import Loading from "../components/Loading";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const [searchParams, setSearchParams] = useSearchParams();

  const p = searchParams.get("p") || "applications";
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/event2/",
        });
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    setActiveTab(p);
  }, [p]);

  const handleViewUser = (id) => {
    setSelectedUser(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleApprove = async (eventId, userId) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `/event/${eventId}/approve/${userId}/`,
      });
      //if success update UI
      if (response.status === 200) {
        setEvents((prev) => {
          return prev.map((e) => {
            if (e.id === eventId) {
              const targetUser = e.applicants.find((applicant) => applicant.id === userId);
              return { ...e, applicants: e.applicants.filter((applicant) => applicant.id !== userId), participants: [...e.participants, targetUser] };
            }
            return e;
          });
        });
      }
    } catch (error) {
      console.error("Error approving applicant", error);
    }
  };

  const handleDeny = async (eventId, userId) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `/event/${eventId}/deny/${userId}/`,
      });
      if (response.status === 200) {
        setEvents((prev) => {
          return prev.map((e) => {
            if (e.id === eventId) return { ...e, applicants: e.applicants.filter((applicant) => applicant.id !== userId) };
            return e;
          });
        });
      }
    } catch (error) {
      console.error("Error denying applicant", error);
    }
  };

  events.sort((a, b) => b.applicants.length || 0 - a.applicants.length || 0);
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>

      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 ${activeTab === "applications" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSearchParams("p=applications")}
        >
          Applicants
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "participants" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSearchParams("p=participants")}
        >
          Participants
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : activeTab === "applications" ? (
        events.map((event) => (
          <div key={event.id} className="bg-white p-4 mb-4 rounded-lg shadow-md border">
            <div className="flex justify-between">
              <div className="w-1/3 flex items-center gap-3">
                <Link to={`/event/${event.id}`}>
                  <h2 className="text-xl font-semibold text-teal-600 hover:underline">{event.name}</h2>
                </Link>
              </div>

              <div className="w-2/3 border-l-2 pl-2">
                <h3 className="text-md font-bold mb-1">Applicants:</h3>
                <ul>
                  {event.applicants && event.applicants.length > 0 ? (
                    event.applicants.map((applicant) => (
                      <li key={applicant.id} className="flex justify-between ">
                        <div className="flex items-center gap-4">
                          {applicant.fullname}
                          <button className="bg-teal-600 text-white px-2 py-1 rounded-md" onClick={() => handleViewUser(applicant.id)}>
                            <i className="bx bx-search"></i>
                          </button>
                        </div>
                        <div>
                          <button className="bg-teal-600 text-white px-2 py-1 rounded-md mr-2" onClick={() => handleApprove(event.id, applicant.id)}>
                            Approve
                          </button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleDeny(event.id, applicant.id)}>
                            Deny
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No applicants yet</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        events.map((event) => (
          <div key={event.id} className="bg-white p-4 mb-4 rounded-lg shadow-md border">
            <div className="flex justify-between">
              <div className="w-1/3 flex items-center gap-3">
                <Link to={`/event/${event.id}`}>
                  <h2 className="text-xl font-semibold text-teal-600 hover:underline">{event.name}</h2>
                </Link>
              </div>

              <div className="w-2/3 border-l-2 pl-2">
                <h3 className="text-md font-bold mb-1">Participants:</h3>
                <ul>
                  {event.participants && event.participants.length > 0 ? (
                    event.participants.map((participant) => (
                      <li key={participant.id} className="flex justify-between mb-1">
                        <div className="flex items-center gap-4">
                          {participant.fullname}
                          <button className="bg-teal-600 text-white px-2 py-1 rounded-md" onClick={() => handleViewUser(participant.id)}>
                            <i className="bx bx-search"></i>
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No participants yet</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))
      )}

      {isModalOpen && selectedUser && <UserProfileModal id={selectedUser} closeModal={closeModal} />}
    </div>
  );
};

export default EventManagement;
