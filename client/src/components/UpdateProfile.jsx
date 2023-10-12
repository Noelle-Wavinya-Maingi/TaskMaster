import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    image_url: "", 
  });
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(""); 

  useEffect(() => {
    // Fetch the user's data from the backend API
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("/account", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PATCH request to update the user's profile
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("/account", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Send the user data as JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Redirect to the profile page after a successful update
      navigate("/profile");
    } catch (error) {
      // Handle errors, including the case where the username is already in use
      console.error("Error updating profile:", error);

    if (error.message === "Username already in use") {
      // Display the flash message for username conflict
      setFlashMessage("Username is already in use. Please choose another.");
    }
    }
  };

  return (
    <div>
      <div className="container">
        <h2>Update Your Profile</h2>
        {loading ? (
          <p>Loading user profile...</p>
        ) : (
          <div>
            {flashMessage && (
              <div className="alert alert-danger">{flashMessage}</div>
            )} 
            <form onSubmit={handleSubmit} className="border p-3 " >
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  value={user.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image" className="form-label">Image URL:</label>
                <input
                  type="text"
                  name="image_url"
                  id="image"
                  className="form-control"
                  value={user.image_url}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
