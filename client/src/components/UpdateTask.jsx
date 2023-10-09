import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTaskList = () => {
  // ... (your existing code)

  return (
    <div className="text-center"> 
      <h3>Update Task List</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={taskList.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={taskList.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Task List
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskList;
