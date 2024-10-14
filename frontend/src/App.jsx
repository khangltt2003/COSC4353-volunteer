import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import Thankyou from "./pages/Thankyou";
import EventForm from "./pages/EventForm";
import Save from "./pages/Save";
import VolunteerMatch from "./pages/VolunteerMatch";
import MatchSave from "./pages/MatchSave";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import NotificationPage from "./pages/NotificationPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import { AuthProvider } from "../context/AuthContext";
import Logout from "./pages/Logout";
import EventDetail from "./pages/EventDetail";
import AdminIndicator from "./components/AdminIndicator";
import Footer from "./components/Footer";
import About from "./pages/About";
import { SkillProvider } from "../context/SkillContext";
import CreateProfile from "./pages/CreateProfile";
import ManageEvent from "./pages/MangeEvent";
import AdminRoute from "./utils/AdminRoute";

function App() {
  return (
    <Router>
      <div>
        <SkillProvider>
          <AuthProvider>
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
                <Route path="/profile" element={<Profile />} />
                <Route path="/event" element={<Events />} />
                <Route path="/event/:id" element={<EventDetail />} />

                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="/history" element={<History />} />
                <Route path="/volunteer" element={<VolunteerMatch />} />
                <Route path="/match" element={<MatchSave />} />
                <Route
                  path="/event/create"
                  element={
                    <AdminRoute>
                      <EventForm />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/event/manage"
                  element={
                    <AdminRoute>
                      <ManageEvent />
                    </AdminRoute>
                  }
                />
                <Route path="/save" element={<Save />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/submit" element={<Thankyou />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          </AuthProvider>
        </SkillProvider>
      </div>
    </Router>
  );
}

export default App;
