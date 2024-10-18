import { useContext, useEffect, useState } from "react";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ProfileContext from "../../context/ProfileContext";

const NotificationPage = () => {
  const { authTokens } = useContext(AuthContext);
  const { profile, profileLoaded, getProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authTokens) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    getProfile();
  }, [navigate]);

  if (profileLoaded) {
    profile.notifications.sort((a, b) => b.id - a.id);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {!profileLoaded ? (
        <Loading />
      ) : (
        <div className="p-6">
          {profile.notifications.length > 0 ? (
            <>
              {profile.notifications.map((notification) => (
                <Notification key={notification.id} notification={notification} getProfile={getProfile} />
              ))}
            </>
          ) : (
            <p className="text-xl">You don&apos;t have any notifications.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
