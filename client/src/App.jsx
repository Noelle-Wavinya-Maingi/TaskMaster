import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
// import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import UpdateTaskList from "./components/UpdateTask";
import TaskListDetail from "./components/TaskListDetai";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/log_in" element={<Login />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="/registration" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-task-list/:id" element={<UpdateTaskList />} />
          <Route path="/task_lists/:taskListId" element={<TaskListDetail />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
