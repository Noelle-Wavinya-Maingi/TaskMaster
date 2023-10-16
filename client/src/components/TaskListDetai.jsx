import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TaskListDetail = () => {
  const { id } = useParams();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
    task_list_name: "",
    labels: [],
  });

  const [taskLists, setTaskLists] = useState([]);
  const [listTasks, setTasks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [labelsList, setLabels] = useState([]);
  const [selectedTaskListId, setSelectedTaskListId] = useState("");

  useEffect(() => {
    // Get the access token stored in the local storage
    const storedAccessToken = localStorage.getItem("accessToken");
    console.log(storedAccessToken);
    console.log("Access Token:", accessToken);
    if (storedAccessToken) {
      setAccessToken(`Bearer ${storedAccessToken}`);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      // Fetch the individual task list and its tasks by ID from the backend API
      const fetchData = async () => {
        try {
          const taskListResponse = await fetch(`/tasklist`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          });

          if (!taskListResponse.ok) {
            throw new Error(`HTTP error! Status: ${taskListResponse.status}`);
          }

          const taskListData = await taskListResponse.json();
          console.log("Task lists:", taskListData);
          setTaskLists(taskListData);

          const tasksResponse = await fetch(`/tasks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          });

          if (!tasksResponse.ok) {
            throw Error(`HTTP error! Status: ${tasksResponse.status}`);
          }

          const tasksData = await tasksResponse.json();
          console.log(tasksData);
          setTasks(tasksData.tasks || []);

          const labelsResponse = await fetch(`/labels`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          });

          if (!labelsResponse.ok) {
            throw new Error(`HTTP error! Status: ${labelsResponse.status}`);
          }

          const labelsData = await labelsResponse.json();
          console.log("Labels response:", labelsData);
          setLabels(labelsData);
          console.log(labelsList);

          setIsLoading(false);
        } catch (error) {
          setError(error.message || "An error occurred");
        }
      };

      // Call the fetchData function
      fetchData();
      console.log("Labels", labelsList);
    }
  }, [accessToken, id]);

  console.log("Task Lists State:", taskLists); // Log the task lists state
  console.log("Labels State:", labelsList);

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

      const response = await fetch(`/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
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
      console.log("Selected:", selectedTaskList);

      if (!selectedTaskList) {
        setError("Task list not found!");
        return;
      }

      const response = await fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          ...newTask,
          task_list_name: selectedTaskList.title,
          due_date: formattedDate,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || "An error occurred");
        return;
      }

      const createdTask = await response.json();

      // Update: Store labels in TaskLabel association table
      if (newTask.labels.length > 0) {
        for (const labelId of newTask.labels) {
          const taskLabelResponse = await fetch("/tasklabels", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
            body: JSON.stringify({
              task_id: createdTask.id,
              label_id: labelId,
            }),
          });

          if (!taskLabelResponse.ok) {
            const errorResponse = await taskLabelResponse.json();
            setError(errorResponse.message || "An error occurred");

            console.error("Error adding labels to the task:", errorResponse);
          }
        }
      }

      setTasks([...tasks, createdTask]);

      setNewTask({
        title: "",
        description: "",
        due_date: "",
        task_list_name: "",
        labels: [], // Clear selected labels
      });

      setShowForm(false);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  const handleTaskListChange = (e) => {
    const { value } = e.target;
    setSelectedTaskListId(value);
    setNewTask((prevTask) => ({
      ...prevTask,
      task_list_name: value,
    }));
  };

  const handleLabelSelection = (e) => {
    const { value } = e.target;
    // Check if the label is already selected, if so, remove it; otherwise, add it
    setNewTask((prevTask) => ({
      ...prevTask,
      labels: prevTask.labels.includes(value)
        ? prevTask.labels.filter((labelId) => labelId !== value)
        : [...prevTask.labels, value],
    }));
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <h3 className="task-title">Tasks</h3>
          {error ? (
            <p className="error-message">Error: {error}</p>
          ) : (
            <>
              <div>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="form-button"
                >
                  Add Task
                </button>
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
                      {taskLists.length > 0 ? ( // Check if taskLists data is available
                        <select
                          className="form-select"
                          name="task_list_name"
                          id="task_list_name"
                          value={newTask.task_list_name}
                          onChange={handleTaskListChange}
                        >
                          <option value="">Select a Task List</option>
                          {taskLists.map((taskList) => (
                            <option key={taskList.id} value={taskList.id}>
                              {taskList.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>Loading task lists...</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="labels">Labels:</label>
                      {labelsList.length > 0 ? (
                        <select
                          className="form-select"
                          name="label-list"
                          id="label-list"
                          value={newTask.labels}
                          onChange={handleLabelSelection}
                          multiple 
                        >
                          {labelsList.map((label) => (
                            <option
                              key={label.id}
                              value={label.id}
                              selected={newTask.labels.includes(label.id)}
                            >
                              {label.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>Loading labels...</p>
                      )}
                    </div>{" "}
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
              {listTasks.length > 0 ? (
                <ul>
                  {listTasks.map((task) => (
                    <li key={task.id}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          handleTaskStatusChange(task.id, task.completed)
                        }
                      />
                      &nbsp;&nbsp;
                      <strong>{task.title}</strong>: {task.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-tasks-message">No tasks yet.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskListDetail;
