import EventCard from "./EventCard";

const EventBoard = ({ appliedEvents, joinedEvents }) => {
  const today = new Date();
  const upcomingEvent = joinedEvents.filter((e) => new Date(e.date) >= today);
  const pastEvent = joinedEvents.filter((e) => new Date(e.date) < today);

  return (
    <>
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-2">Pending Events</h1>
        {appliedEvents.length === 0 ? (
          <p>You don&apos;t have any pending events</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {appliedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-2">Upcoming Events</h1>
        {upcomingEvent.length === 0 ? (
          <p>You don&apos;t have any upcoming events</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {upcomingEvent.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-2">Past Events</h1>
        {pastEvent.length === 0 ? (
          <p>You don&apos;t have any upcoming events</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {pastEvent.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EventBoard;
