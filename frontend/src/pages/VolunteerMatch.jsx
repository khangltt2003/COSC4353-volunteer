import { useEffect, useState } from "react";
import axios from "../axios"; // Your axios config

const VolunteerMatching = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const response = await axios({
        method: "GET",
        url: "/user/",
      });
      setVolunteers(response.data);
    };
    const fetchEvents = async () => {
      const response = await axios({
        method: "GET",
        url: "/event/",
      });
      setEvents(response.data);
    };
    fetchVolunteers();
    fetchEvents();
  }, []);

  const matchVolunteerToEvents = (volunteer) => {
    return events
      .map((event) => {
        let reasons = [];
        const isLocationMatch = event.city.includes(volunteer.city);
        if (isLocationMatch) {
          reasons.push("Location");
        }
        const isSkillsMatch = event.skills_needed.some((skill) => volunteer.skills.includes(skill));
        if (isSkillsMatch) {
          reasons.push("Skills");
        }
        const isDateMatch = volunteer.availability.includes(event.date);
        if (isDateMatch) {
          reasons.push("Availability");
        }
        return reasons.length >= 2
          ? {
              event,
              reasons,
            }
          : null;
      })
      .filter(Boolean); // Filter out nulls (no match)
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Volunteer Event Matching</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Volunteer Name</th>
              <th className="py-2 px-4 border">Matched Events</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => {
              const matchedEvents = matchVolunteerToEvents(volunteer);

              return (
                <tr key={volunteer.id}>
                  <td className="py-2 px-4 border">{volunteer.fullname}</td>
                  <td className="py-2 px-4 border">
                    {matchedEvents.length > 0 ? (
                      <ul>
                        {matchedEvents.map(({ event, reasons }) => (
                          <li key={event.id}>
                            {event.name} ({reasons.join(", ")})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No matches found</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerMatching;
