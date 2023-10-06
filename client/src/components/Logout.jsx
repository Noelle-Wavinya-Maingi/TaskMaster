import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Display a confirmation dialog before logging out
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      // Clear user session data (e.g., remove JWT token from local storage)
      localStorage.removeItem("accessToken");

      // Navigate to the login page ("/log_in" route)
      navigate("/log_in");
    }
  };

  return (
    <div>
      {/* No need to display the confirmation message here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
