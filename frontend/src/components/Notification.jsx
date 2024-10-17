const Notification = ({ eventName, eventId, type }) => {
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

  return (
    <div className={`p-4 mb-4 border rounded-lg ${bgColor} ${borderColor} border`}>
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
