import { useEffect, useState } from "react";
import axios from "../axios"; // Axios setup for API requests
import { Link } from "react-router-dom";
import UserProfileModal from "../components/UserProfileModal";
import Loading from "../components/Loading";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Function to open the modal and display the applicant information
  const handleViewApplicant = (id) => {
    setSelectedApplicant(id);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedApplicant(null);
    setIsModalOpen(false);
  };
  events.sort((a, b) => (b.applicants?.length || 0) - (a.applicants?.length || 0));

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Event Management</h1>
      {isLoading ? (
        <Loading />
      ) : (
        events.map((event) => (
          <div key={event.id} className="bg-white p-4 mb-4 rounded-lg shadow-md border">
            <div className="flex justify-between">
              {/* Event details on the left */}
              <div className="w-1/3 flex items-center gap-3">
                <Link to={`/event/${event.id}`}>
                  <h2 className="text-xl font-semibold text-teal-600 hover:underline">{event.name}</h2>
                </Link>

                <div className="">
                  <button className="bg-teal-600 text-white px-2 py-1 rounded-md mr-2">Update</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                </div>
              </div>

              <div className="w-2/3 border-l-2 pl-2">
                <h3 className="text-md font-bold mb-2">Applicants:</h3>
                <ul>
                  {event.applicants && event.applicants.length > 0 ? (
                    event.applicants.map((applicant) => (
                      <li key={applicant.id} className="flex justify-between mb-2">
                        <div className="flex items-center gap-4">
                          {applicant.fullname}
                          <button className="bg-teal-600 text-white px-2 py-1 rounded-md" onClick={() => handleViewApplicant(applicant.id)}>
                            <i className="bx bx-search"></i>
                          </button>
                        </div>
                        <div>
                          <button className="bg-teal-600 text-white px-2 py-1 rounded-md mr-2">Approve</button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded-md">Deny</button>
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
      )}

      {isModalOpen && selectedApplicant && <UserProfileModal id={selectedApplicant} closeModal={closeModal} />}
    </div>
  );
};

export default EventManagement;
