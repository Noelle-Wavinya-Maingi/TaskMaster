import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import UpdateTaskList from "./components/UpdateTask";
import TaskListDetail from "./components/TaskListDetai";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
      
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/log_in" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-task-list/:id" element={<UpdateTaskList />} />
          <Route path="/view-task-list/:id" element={<TaskListDetail />} />
          <Route path="/update-profile" element = {<UpdateProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
