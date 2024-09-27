import { useState } from "react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "assignment",
      message: "New event assignment available!",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: "update",
      message: "Event update: Time changed to 3 PM.",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      type: "reminder",
      message: "Reminder: Meeting at 2 PM tomorrow.",
      timestamp: new Date().toISOString(),
    },
  ]);

  const Notification = ({ type, message, timestamp }) => {
    let bgColor, borderColor;
    switch (type) {
      case "assignment":
        bgColor = "bg-green-100";
        borderColor = "border-green-400";
        break;
      case "update":
        bgColor = "bg-gray-100";
        borderColor = "border-gray-400";
        break;
      case "reminder":
        bgColor = "bg-yellow-100";
        borderColor = "border-yellow-400";
        break;
      default:
        bgColor = "bg-white";
        borderColor = "border-gray-200";
    }

    return (
      <div className={`p-4 mb-4 border rounded-lg ${bgColor} ${borderColor} border`}>
        <p>{message}</p>
        <span className="text-sm text-gray-500">{new Date(timestamp).toLocaleTimeString()}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="p-6">
        {notifications.map((notif) => (
          <Notification key={notif.id} type={notif.type} message={notif.message} timestamp={notif.timestamp} />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
