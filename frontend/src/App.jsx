import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
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
import "./App.css";
import Profile from "./pages/Profile";
import Events from "./pages/Events";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/volunteer" element={<VolunteerMatch />} />
          <Route path="/match" element={<MatchSave />} />
          <Route path="/createevent" element={<EventForm />} />
          <Route path="/save" element={<Save />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/submit" element={<Thankyou />} />
          {/*<Route path="/about" element={<About />} />*/}
        </Routes>
=======
import Login2 from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
>>>>>>> develop
      </div>
    </Router>
  );
}

export default App;
