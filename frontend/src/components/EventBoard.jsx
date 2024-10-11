import EventCard from "./EventCard";

const EventBoard = ({ appliedEvents, joinedEvents }) => {
  const today = new Date();
  const upcomingEvent = joinedEvents.filter((e) => new Date(e.date) >= today);
  const pastEvent = joinedEvents.filter((e) => new Date(e.date) < today);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Pending Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {appliedEvents.length === 0 ? (
          <p>You don&apos;t have any applied events</p>
        ) : (
          appliedEvents.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {upcomingEvent.length === 0 ? (
          <p>You don&apos;t have any upcomming events</p>
        ) : (
          upcomingEvent.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
      <h1 className="text-2xl font-bold mb-4">Past Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastEvent.length === 0 ? <p>You don&apos;t have any past events</p> : pastEvent.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </>
  );
};

export default EventBoard;
