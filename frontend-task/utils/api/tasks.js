"use client";
import axios from "../api";
import { useNavigate } from "react-router-dom";

export const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/tasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include"
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// logout

export const logoutUser = async () => {
  try {
    const response = await axios.post("/auth/logout");

    if (response.data.success) {
      localStorage.removeItem("token");
      return true;
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  try {
    "api file update", taskId;
    const token = localStorage.getItem("token");

    const response = await axios.put(`/tasks/${taskId}`, taskData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include"
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`/tasks/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include"
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

//add task
export const addTask = async (newTask) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post("/tasks", newTask, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include"
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to add task. Please try again."
      );
    } else if (error.request) {
      console.error("Network Error:", error.request);
      throw new Error("Network error. Please check your connection.");
    } else {
      console.error("Error:", error.message);
      throw new Error("An error occurred while adding the task.");
    }
  }
};
