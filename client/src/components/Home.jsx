import React from "react";
import { useNavigate } from "react-router-dom";
// import '../App.css'

function Home() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate("/log_in")
  }

  return (
    <div className="container-text-center-mt-5">
      <h1>Welcome to TaskMaster</h1>
      <div className="row justify-content-center">
        <div className="col-md-4">
          {/* <img
            src="https://www.pexels.com/photo/pen-calendar-to-do-checklist-3243/"
            alt="image1"
            className="img-fluid rounded mb-3"
          /> */}
        </div>
        </div>
        <button onClick={handleLoginClick} className="btn btn-primary mt-4">
          Login
        </button>
    </div>
  );
}

export default Home
