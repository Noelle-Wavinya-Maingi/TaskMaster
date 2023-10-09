import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [taskLists, setTaskLists] = useState([]);
  const [newTaskList, setNewTaskList] = useState({
    title: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch user's task lists from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tasklist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTaskLists(data.task_lists || []);
      } catch (error) {
        console.error("Error fetching task lists:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTaskList((prevTaskList) => ({
      ...prevTaskList,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new task list
      const response = await fetch("/api/tasklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newTaskList),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Update the taskLists state with the newly created task list
      setTaskLists((prevTaskLists) => [...prevTaskLists, data]);

      // Clear the input fields
      setNewTaskList({ title: "", description: "" });

      // Hide the form after submission
      setShowForm(false);
    } catch (error) {
      console.error("Error creating task list:", error);
    }
  };

  const handleDeleteTaskList = async (taskListId) => {
    try {
      // Send a DELETE request to delete the task list by ID
      const response = await fetch(`/api/tasklist/${taskListId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted task list from the state
      setTaskLists((prevTaskLists) =>
        prevTaskLists.filter((taskList) => taskList.id !== taskListId)
      );
    } catch (error) {
      console.error("Error deleting task list:", error);
    }
  };

  const handleViewTaskList = (taskListId) => {
    // Replace 'taskListId' with the actual ID of the task list you want to view
    navigate(`/view-tasklist/${taskListId}`);
  };

  return (
    <div>
      <div
         className="container" 
         style={{ marginTop: "70px", alignContent: "center" }}
      >
        <h3>Your Task Lists</h3>
        {showForm ? (
          <>
            <h3>Create a New Task List</h3>
            <form onSubmit={handleSubmit} className="border p-3 mb-4">
              <div className="form-group">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  value={newTaskList.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  value={newTaskList.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mr-5">
                Create Task List
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </form>
          </>
        ) : (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <i className="fas fa-plus fa-sm"></i>&nbsp; Add Task List
          </button>
        )}
        <div className="row">
          {taskLists.length === 0 ? (
            <p>No task lists available.</p>
          ) : (
            taskLists.map((taskList) => (
              <div key={taskList.id} className="col-md-4 mb-4">
                <div className="card-overlay">
                  <div className="card-tasks">
                    <div className="card-body">
                      <h5 className="card-title">{taskList.title}</h5>
                      <p className="card-text">{taskList.description}</p>
                    </div>
                  </div>
                  <div className="overlay">
                    <div className="text">
                      <Link
                        to={`/task_lists/${taskList.id}`}
                        onClick={() => handleViewTaskList(taskListId)}
                        className="btn btn-primary button-spacing"
                      >
                        View Details
                      </Link>
                      <Link
                        className="btn btn-danger ml-3"
                        onClick={() => handleDeleteTaskList(taskList.id)}
                      >
                        Delete
                      </Link>
                      <Link
                        to={`/update-task-list/${taskList.id}`}
                        className="btn btn-secondary mt-3"
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;