import EventCard from "./EventCard";

const EventBoard = ({ events }) => {
  const today = new Date();
  const upcomingEvent = events.filter((e) => new Date(e.date) >= today);
  const pastEvent = events.filter((e) => new Date(e.date) < today);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {upcomingEvent.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">Past Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastEvent.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
};

export default EventBoard;
