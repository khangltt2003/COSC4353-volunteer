import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import EventForm from "./pages/EventForm";
import VolunteerMatch from "./pages/VolunteerMatch";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import NotificationPage from "./pages/NotificationPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About";
import CreateProfile from "./pages/CreateProfile";
import ManageEvent from "./pages/MangeEvent";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminIndicator from "./components/AdminIndicator";

import { AuthProvider } from "../context/AuthContext";
import { ProfileProvider } from "../context/ProfileContext";
import { SkillProvider } from "../context/SkillContext";

import AdminRoute from "./utils/AdminRoute";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <div>
        <SkillProvider>
          <AuthProvider>
            <ProfileProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create-profile" element={<CreateProfile />} />

                <Route
                  element={
                    <>
                      <AdminIndicator />
                      <Navbar />
                      <Outlet />
                      <Footer />
                    </>
                  }
                >
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/event" element={<Events />} />
                  <Route path="/event/:id" element={<EventDetail />} />

                  <Route
                    path="/notifications"
                    element={
                      <PrivateRoute>
                        <NotificationPage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/volunteer" element={<VolunteerMatch />} />
                  <Route
                    path="/event/create"
                    element={
                      <PrivateRoute>
                        <AdminRoute>
                          <EventForm />
                        </AdminRoute>
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/event/manage"
                    element={
                      <PrivateRoute>
                        <AdminRoute>
                          <ManageEvent />
                        </AdminRoute>
                      </PrivateRoute>
                    }
                  />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/about" element={<About />} />
                </Route>
              </Routes>
            </ProfileProvider>
          </AuthProvider>
        </SkillProvider>
      </div>
    </Router>
  );
}

export default App;
