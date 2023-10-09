import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the JWT token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Check if the token exists
    if (accessToken) {
      // Make an API request to fetch user data using the token
      fetch("/api/account", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUser(data); // Set the user data in state
          setLoading(false); // Set loading to false
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false); // Set loading to false even in case of an error
        });
    } else {
      setLoading(false); // If no token exists, set loading to false
    }
  }, []);

  const navigate = useNavigate();

  // Function to handle the update button click
  const handleUpdateClick = () => {
    // Redirect or navigate to the update profile page
    navigate("/update-profile"); 
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Your Profile</h2>
        {loading ? (
          <p>Loading user profile...</p>
        ) : user ? (
          <div className="card text-center">
            <img
              src={user.image_url}
              alt={user.username}
              className="card-img-top rounded-circle mx-auto"
              style={{ width: "150px", height: "150px" }} 
            />
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <p className="card-text">
                <strong>Email:</strong> {user.email}
              </p>
              <button className="btn btn-primary" onClick={handleUpdateClick}>
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          <p>User data not available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
