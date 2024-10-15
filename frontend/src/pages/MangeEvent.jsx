import { useEffect, useState } from "react";
import axios from "../axios"; // Axios setup for API requests
import { Link } from "react-router-dom";
import UserProfileModal from "../components/UserProfileModal";
import Loading from "../components/Loading";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("events"); // Track the active tab

  // Fetch events data on component load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "/event2/", // Replace with your actual API endpoint
        });
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchEvents();
  }, []);

  // Function to open the modal and display the user (applicant/participant) information
  const handleViewUser = (id) => {
    setSelectedUser(id);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Function to handle approval of applicants
  const handleApprove = async (eventId, userId) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `/event/${eventId}/approve/${userId}/`,
      });
      if (response.status === 200) {
        // Update the event state by removing the approved applicant
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  applicants: event.applicants.filter((applicant) => applicant.id !== userId),
                  participants: [...event.participants, event.applicants.find((applicant) => applicant.id === userId)],
                }
              : event
          )
        );
      }
    } catch (error) {
      console.error("Error approving applicant", error);
    }
  };

  // Function to handle denial of applicants
  const handleDeny = async (eventId, userId) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `/event/${eventId}/deny/${userId}/`,
      });
      if (response.status === 200) {
        // Update the event state by removing the denied applicant
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  applicants: event.applicants.filter((applicant) => applicant.id !== userId),
                }
              : event
          )
        );
      }
    } catch (error) {
      console.error("Error denying applicant", error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 ${activeTab === "events" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("events")}
        >
          Applicants
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "participants" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("participants")}
        >
          Participants
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : activeTab === "events" ? (
        // Events (Applicants) Tab
        events.map((event) => (
          <div key={event.id} className="bg-white p-4 mb-4 rounded-lg shadow-md border">
            <div className="flex justify-between">
              {/* Event details on the left */}
              <div className="w-1/3 flex items-center gap-3">
                <Link to={`/event/${event.id}`}>
                  <h2 className="text-xl font-semibold text-teal-600 hover:underline">{event.name}</h2>
                </Link>
              </div>

              <div className="w-2/3 border-l-2 pl-2">
                <h3 className="text-md font-bold mb-2">Applicants:</h3>
                <ul>
                  {event.applicants && event.applicants.length > 0 ? (
                    event.applicants.map((applicant) => (
                      <li key={applicant.id} className="flex justify-between mb-2">
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
        // Participants Tab
        events.map((event) => (
          <div key={event.id} className="bg-white p-4 mb-4 rounded-lg shadow-md border">
            <div className="flex justify-between">
              {/* Event details on the left */}
              <div className="w-1/3 flex items-center gap-3">
                <Link to={`/event/${event.id}`}>
                  <h2 className="text-xl font-semibold text-teal-600 hover:underline">{event.name}</h2>
                </Link>
              </div>

              <div className="w-2/3 border-l-2 pl-2">
                <h3 className="text-md font-bold mb-2">Participants:</h3>
                <ul>
                  {event.participants && event.participants.length > 0 ? (
                    event.participants.map((participant) => (
                      <li key={participant.id} className="flex justify-between mb-2">
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
