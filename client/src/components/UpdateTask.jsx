import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTaskList = () => {
  const { id } = useParams();
  const [taskList, setTaskList] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the task list data that you want to update based on the 'id'
    const fetchData = async () => {
      try {
        // Get the access token from localStorage
        const storedAccessToken = localStorage.getItem("accessToken");

        if (!storedAccessToken) {
          // Handle the case where the access token is not available
          console.error("Access token not found in localStorage");
          return;
        }

        const response = await fetch(`/api/tasklist/${id}`, {
          method: "GET",
          // Include the access token in the headers
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });

        if (!response.ok) {
          // Handle the case where the API request fails
          throw new Error(`Failed to fetch task list. Status: ${response.status}`);
        }

        const taskListData = await response.json();
        console.log("Fetched task list data:", taskListData);

        // Populate the form fields with the task list data
        setTaskList(taskListData.task_list); 
      } catch (error) {
        // Handle errors if the fetch fails
        console.error("Error fetching task list:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskList((prevTaskList) => ({
      ...prevTaskList,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the access token from localStorage
      const storedAccessToken = localStorage.getItem("accessToken");

      if (!storedAccessToken) {
        // Handle the case where the access token is not available
        console.error("Access token not found in localStorage");
        return;
      }

      // Get the updated task list data from the form
      const updatedTaskList = {
        title: taskList.title,
        description: taskList.description,
        // Add other fields as needed
      };

      // Make a PATCH request to your API to update the task list
      const response = await fetch(`/api/tasklist/${id}`, {
        method: "PATCH", // or "PATCH" depending on your API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedAccessToken}`, 
        },
        body: JSON.stringify(updatedTaskList),
      });

      if (!response.ok) {
        // Handle the case where the API request fails
        throw new Error(`Failed to update task list. Status: ${response.status}`);
      }
      navigate("/dashboard");
    } catch (error) {
      // Handle errors if the update fails
      console.error("Error updating task list:", error);
    }
  };

  // Render the form only when taskList is not null
  if (taskList === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Update Task List</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={taskList.title || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={taskList.description || ""}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Update Task List
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskList;
