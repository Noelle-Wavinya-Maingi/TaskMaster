import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskListDetail = () => {
  const { id } = useParams();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    task_list_name: "",
  });

  const [taskLists, setTaskLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [accessToken, setAccessToken] = useState(""); // Initialize with an empty string
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Function to retrieve the access token from local storage
  const getAccessTokenFromLocalStorage = () => {
    const storedAccessToken = localStorage.getItem("accessToken");
    setAccessToken(storedAccessToken || ""); // Set it to an empty string if not found
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleTaskStatusChange = async (taskId, completed) => {
    try {
      if (typeof completed !== "boolean") {
        setError("Invalid value for 'completed' field");
        return;
      }

      const response = await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !completed } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  const handleAddTask = async () => {
    try {
      const formattedDate = new Date(newTask.due_date)
        .toISOString()
        .slice(0, 19);

      const selectedTaskList = taskLists.find(
        (taskList) => taskList.title === newTask.task_list_name
      );

      if (!selectedTaskList) {
        setError("Task list not found!");
        return;
      }

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
        body: JSON.stringify({
          ...newTask,
          task_list_name: selectedTaskList.title, // Assuming you want to associate the task with the current task list
          due_date: formattedDate,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || "An error occurred");
        return;
      }

      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);

      setNewTask({
        title: "",
        description: "",
        due_date: "",
        task_list_name: "",
      });

      setShowForm(false);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          setIsLoading(false);
          return;
        }

        // Fetch task lists
        const taskListsResponse = await fetch("/api/tasklist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!taskListsResponse.ok) {
          throw new Error(`HTTP error! Status: ${taskListsResponse.status}`);
        }

        const taskListsData = await taskListsResponse.json();
        console.log(taskListsData);
        const receivedTaskLists = taskListsData.task_lists || [];
        console.log(receivedTaskLists);
        setTaskLists(receivedTaskLists);

        // Fetch tasks
        const tasksResponse = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
        });

        if (!tasksResponse.ok) {
          throw new Error(`HTTP error! Status: ${tasksResponse.status}`);
        }

        const tasksData = await tasksResponse.json();
        const receivedTasks = tasksData.tasks || [];
        setTasks(receivedTasks);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to retrieve the access token from local storage
    getAccessTokenFromLocalStorage();

    // Fetch both tasks and task lists here...
    fetchData();
  }, [accessToken]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <h3>Tasks</h3>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <div>
                <button onClick={() => setShowForm(!showForm)} className="form-button">Add Task</button>
                {showForm && (
                  <form className="border p-3 mb-3 mt-3">
                  <h4>Add a New Task</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Title"
                      value={newTask.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      value={newTask.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="due_date"
                      placeholder="Due Date"
                      value={newTask.due_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="task_list_name">Task List:</label>
                    <select
                      className="form-select"
                      name="task_list_name"
                      id="task_list_name"
                      value={newTask.task_list_name}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a Task List</option>
                      {taskLists.map((taskList) => (
                        <option key={taskList.id} value={taskList.title}>
                          {taskList.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddTask}
                  >
                    Add Task
                  </button>
                </form>
                )}
              </div>
              {tasks.length > 0 ? (
                <ul>
                  {tasks.map((task) => (
                    <li key={task.id}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          handleTaskStatusChange(task.id, task.completed)
                        }
                      />&nbsp;&nbsp;
                      <strong>{task.title}</strong>: {task.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tasks yet.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskListDetail;
