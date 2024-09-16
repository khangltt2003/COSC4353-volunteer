import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login2 from "./Pages/Login2";
import Register from "./Pages/Register";
import Homepage from "./Pages/Homepage";
import Navbar from "./components/Navbar";
import "./styles/globals.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/loginpage" element={<Login2 />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
