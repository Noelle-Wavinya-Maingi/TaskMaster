import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTaskList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskList, setTaskList] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Fetch the task list details by ID
    const fetchTaskListById = async () => {
      try {
        const response = await fetch(`/api/tasklist/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTaskList(data.task_list);
      } catch (error) {
        console.error("Error fetching task list details:", error);
      }
    };

    fetchTaskListById();
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
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      // Send a PATCH request to update the task list
      const response = await fetch(`/api/tasklist/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(taskList),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Redirect to the dashboard after a successful update
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task list:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="mb-4">Update Task List</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskList.title}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={taskList.description}
                onChange={handleInputChange}
                className="form-control"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Task List
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskList;
