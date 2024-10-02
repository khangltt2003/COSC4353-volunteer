import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Loading from "../components/Loading";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="h-screen bg-gray-100">
      <div className="h-[70px]"></div>
      <div className="max-w-4xl w-full  bg-white shadow-lg rounded-lg p-8 mx-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1 className="text-4xl font-bold text-teal-600 mb-4">{event.name}</h1>
            <p className="text-gray-700 mb-6">{event.description}</p>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-teal-600 mb-2">Event Details</h2>
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
              <h2 className="text-2xl font-semibold text-teal-600 mb-2">Skills Needed</h2>
              <ul className="list-disc list-inside text-gray-700">
                {event.skills_needed.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button className="bg-teal-600 text-white px-4 py-2 rounded shadow-md hover:bg-teal-700 transition">Apply</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
