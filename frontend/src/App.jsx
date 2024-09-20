import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";
import Thankyou from "./Pages/Thankyou";
import EventForm from "./Pages/EventForm";
import Save from "./Pages/Save";
import VolunteerMatch from "./Pages/VolunteerMatch";
import MatchSave from "./Pages/MatchSave";
import History from "./Pages/History";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import HomePage from "./Pages/Homepage";
import NotificationPage from "./Pages/NotificationPage";
import Register from "./Pages/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/volunteer" element={<VolunteerMatch />} />
          <Route path="/match" element={<MatchSave />} />
          <Route path="/event" element={<EventForm />} />
          <Route path="/save" element={<Save />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/submit" element={<Thankyou />} />
          {/*<Route path="/about" element={<About />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
