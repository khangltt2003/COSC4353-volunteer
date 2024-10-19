import { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "./Loading";

const UserProfileModal = ({ id, closeModal }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUSerProfile = async (id) => {
    const response = await axios({
      method: "GET",
      url: `/user/${id}/mini/`,
    });
    setProfile(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getUSerProfile(id);
  }, [id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div>
              <strong>Fullname:</strong> {profile.fullname}
            </div>
            <div>
              <strong>Email:</strong> {profile.user.email}
            </div>
            <div>
              <strong>Address:</strong> {profile.address1} {profile.address2}, {profile.city}, {profile.state} {profile.zipcode}
            </div>
            <div>
              <strong>Skills:</strong>{" "}
              {profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {profile.skills.map((skill) => (
                    <div key={skill.id} className="bg-teal-600 text-white py-1 px-3 rounded-full ">
                      {skill.name}
                    </div>
                  ))}
                </div>
              ) : (
                <>No skills</>
              )}
            </div>
            <div className="">
              <strong>Availability:</strong>{" "}
              {profile.availability.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {profile.availability.map((d, i) => (
                    <div key={i} className="bg-teal-600 text-white py-1 px-3 rounded-full ">
                      {d}
                    </div>
                  ))}
                </div>
              ) : (
                <>No available dates</>
              )}
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
