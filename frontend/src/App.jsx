import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login2 from "./Pages/Login2";
import Register from "./Pages/Register";
import Homepage from "./Pages/Homepage";
import Profile from "./Pages/Profile";
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
      </div>
    </Router>
  );
}
export default App;
