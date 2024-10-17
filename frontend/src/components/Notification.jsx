import { useState } from "react";
import axios from "../axios";

const Notification = ({ notification }) => {
  let { id, eventName, eventId, type, created_at } = notification;
  const [isRead, setIsRead] = useState(notification.is_read);
  let bgColor, borderColor;
  switch (type) {
    case "approved":
      bgColor = "bg-green-100";
      borderColor = "border-green-400";
      break;
    case "denied":
      bgColor = "bg-gray-100";
      borderColor = "border-gray-400";
      break;
    case "updated":
      bgColor = "bg-yellow-100";
      borderColor = "border-yellow-400";
      break;
    case "deleted":
      bgColor = "bg-red-100";
      borderColor = "border-red-400";
      break;
    default:
      bgColor = "bg-white";
      borderColor = "border-gray-200";
  }

  const handleMouseOn = async () => {
    if (!isRead) {
      try {
        const response = await axios({
          method: "PATCH",
          url: `/notification/${id}/`,
        });
        if (response.status === 200) {
          setIsRead(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={`p-4 mb-4 border rounded-lg ${bgColor} ${borderColor} border relative`} onMouseEnter={handleMouseOn}>
      {!isRead && <div className="rounded-full bg-red-600 p-2 absolute top-[-5px] right-[-5px]"></div>}

      <span>{new Date(created_at).toLocaleString("en-US", { timeZone: "America/Chicago" })}</span>
      {type === "approved" && (
        <p>
          Congratulation! Your application to{" "}
          <a className="underline " href={`/event/${eventId}`}>
            {eventName}
          </a>{" "}
          is approved.
        </p>
      )}
      {type === "denied" && (
        <p>
          Unfortunately, your application to{" "}
          <a className="underline " href={`/event/${eventId}`}>
            {eventName}
          </a>{" "}
          is denied.
        </p>
      )}
      {type === "updated" && (
        <p>
          The event that you joined{" "}
          <a className="underline " href={`/event/${eventId}`}>
            {eventName}
          </a>{" "}
          is updated. Please check.
        </p>
      )}
      {type === "deleted" && (
        <p>
          The event that you joined <a className="underline ">{eventName}</a> is deleted.
        </p>
      )}
    </div>
  );
};

export default Notification;
