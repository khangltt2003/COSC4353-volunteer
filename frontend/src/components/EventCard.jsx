import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border border-teal-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/event/${event.id}`}>
        <h2 className="text-xl font-semibold text-teal-600 mb-3 hover:underline">{event.name}</h2>
      </Link>
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600 mb-2">
        <strong>Address:</strong> {event.address}, {event.city}, {event.state} {event.zipcode}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Date:</strong> {event.date}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Time:</strong> {event.time}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Urgency:</strong> {event.urgency[0].toUpperCase() + event.urgency.slice(1)}
      </p>
    </div>
  );
};

export default EventCard;
