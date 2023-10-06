import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import UpdateTaskList from "./components/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/log_in" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="dashboard/update-task-list/:id" element={<UpdateTaskList />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
