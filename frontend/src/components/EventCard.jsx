import { Link } from "react-router-dom";

const EventCard = ({ event, isApplied, isJoined }) => {
  return (
    <div className="border border-teal-600 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-1 flex justify-between items-center">
        <Link to={`/event/${event.id}`}>
          <h2 className="text-xl font-semibold text-teal-600  hover:underline">{event.name}</h2>
        </Link>
        {isApplied && <div className="border border-teal-600 text-teal-600 rounded px-2 py-1">Applied</div>}
        {isJoined && <div className="border border-teal-600 text-teal-600 rounded px-2 py-1">Joined</div>}
      </div>

      <p className="text-gray-700 mb-1">{event.description}</p>
      <p className="text-gray-600 mb-1">
        <strong>Address:</strong> {event.address}, {event.city}, {event.state} {event.zipcode}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Date:</strong> {event.date}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Time:</strong> {event.time}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Urgency:</strong> {event.urgency[0].toUpperCase() + event.urgency.slice(1)}
      </p>
    </div>
  );
};

export default EventCard;
