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
      <p>
        TaskMaster is your all-in-one solution for managing your daily tasks and
        achieving your goals efficiently. Whether you're a professional looking
        to stay organized at work, a student managing assignments, or anyone
        seeking a more structured approach to task management, TaskMaster is
        here to simplify your life. Experience the power of TaskMaster and take
        charge of your tasks today! Sign up now and start getting things done
        with ease. Your tasks, your way!
      </p>
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
