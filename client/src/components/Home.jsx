import React from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/log_in");
  };

  return (
    <div className="home-container">
      <h1>Welcome to TaskMaster</h1>
      <div className="row justify-content-center">
        <div className="col-md-4"></div>
      </div>
      <button onClick={handleLoginClick} className="btn btn-primary mt-4">
        <i className="fas fa-sign-in-alt fa-sm"></i>&nbsp; Login
      </button>
    </div>
  );
}

export default Home;
