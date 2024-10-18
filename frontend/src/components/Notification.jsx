import { useState } from "react";
import axios from "../axios";

const Notification = ({ notification, getProfile }) => {
  let { id, event_name, event_id, type, created_at } = notification;
  const [isRead, setIsRead] = useState(notification.is_read);
  let bgColor, borderColor, xColor;
  switch (type) {
    case "approved":
      bgColor = "bg-green-100";
      borderColor = "border-green-400";
      xColor = "bg-green-300";
      break;
    case "denied":
      bgColor = "bg-gray-100";
      borderColor = "border-gray-400";
      xColor = "bg-gray-300";
      break;
    case "updated":
      bgColor = "bg-yellow-100";
      borderColor = "border-yellow-400";
      xColor = "bg-yellow-300";
      break;
    case "deleted":
      bgColor = "bg-red-100";
      borderColor = "border-red-400";
      xColor = "bg-red-300";
      break;
    default:
      bgColor = "bg-white";
      borderColor = "border-gray-200";
      xColor = "bg-red-300";
  }
  //set notification is_read to true
  const handleMouseOn = async () => {
    if (!isRead) {
      try {
        const response = await axios({
          method: "PATCH",
          url: `/notification/${id}/`,
        });
        if (response.status === 200) {
          setIsRead(true);
          getProfile();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteNotification = async () => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `/notification/${id}/`,
      });
      if (response.status === 200) {
        getProfile();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`p-4 mb-4 border rounded-lg ${bgColor} ${borderColor} border relative`} onMouseEnter={handleMouseOn}>
      {!isRead && <div className="rounded-full bg-red-600 p-2 absolute top-[-5px] right-[-5px]"></div>}
      <div
        className={`flex justify-center items-center absolute top-[20px] right-[10px] translate-y-[-50%] hover:scale-125 cursor-pointer`}
        onClick={handleDeleteNotification}
      >
        <i className="bx bx-x"></i>
      </div>
      <span>{new Date(created_at).toLocaleString("en-US", { timeZone: "America/Chicago" })}</span>
      {type === "approved" && (
        <p>
          Congratulation! Your application to{" "}
          <a className="underline " href={`/event/${event_id}`}>
            {event_name}
          </a>{" "}
          is approved.
        </p>
      )}
      {type === "denied" && (
        <p>
          Unfortunately, your application to{" "}
          <a className="underline " href={`/event/${event_id}`}>
            {event_name}
          </a>{" "}
          is denied.
        </p>
      )}
      {type === "updated" && (
        <p>
          The event that you joined{" "}
          <a className="underline " href={`/event/${event_id}`}>
            {event_name}
          </a>{" "}
          is updated. Please check.
        </p>
      )}
      {type === "deleted" && (
        <p>
          The event that you joined <a className="underline ">{event_name}</a> is deleted.
        </p>
      )}
    </div>
  );
};

export default Notification;
