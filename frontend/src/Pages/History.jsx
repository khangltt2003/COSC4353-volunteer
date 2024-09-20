import { useNavigate } from "react-router-dom";

const Profile = {
  name: "Alice Johnson",
  skill: "Dental",
  username: "alicejohnson",
  event1: "Dental Event 2022",
  event2: "Dental Event 2023",
};

const History = () => {
  return (
    <div className="full-w w-screen min-h-screen font-black bg-cyan-100 space-y-16 bg-cover bg-center">
      <p className="p-15 full-w -mt-10 text-zinc-100 bg-stone-900 bg-cover bg-center w-screen h-48 text-5xl text-center flex items-center justify-center">
        Volunteer History
      </p>
      <div className="flex flex-col items-start space-y-4 mt-4 px-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-left px-9">
            Volunteer Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={Profile.name}
            readOnly
            className="w-52 px-3 py-2 font-light border rounded-lg shadow-sm focus:outline-none focus:border-sky-700"
          />
        </div>
      </div>
    </div>
  );
};

export default History;
