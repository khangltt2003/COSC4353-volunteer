import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
      </div>
    </Router>
  );
}
export default App;
