import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [navigate]); // Ensure this effect runs when navigating

  return <div>{isLoggedIn ? <h1>Welcome to the Homepage!</h1> : <h1>Please log in to access more features</h1>}</div>;
}
