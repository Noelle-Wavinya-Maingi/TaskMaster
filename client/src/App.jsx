import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import './App.css'
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App(){
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/log_in" element = {<Login />} />
        <Route path="/registration" element = {<Register />} />
        <Route path="/dashboard" element = {<Dashboard />} />
      </Routes>
    </div>
    </BrowserRouter>
  )

}

export default App