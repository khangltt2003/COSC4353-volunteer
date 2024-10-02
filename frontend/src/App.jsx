import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event" element={<Events />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/volunteer" element={<VolunteerMatch />} />
            <Route path="/match" element={<MatchSave />} />
            <Route path="/createevent" element={<EventForm />} />
            <Route path="/save" element={<Save />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/submit" element={<Thankyou />} />
            <Route path="/logout" element={<Logout />} />
            {/*<Route path="/about" element={<About />} />*/}
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
