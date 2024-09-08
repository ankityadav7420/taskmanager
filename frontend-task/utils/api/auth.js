// utils/api/auth.js
"use client";
import axios from "../api";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post("/auth/register", formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed", error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post("/auth/login", formData, {
      withCredentials: true
    });
    const { token } = response.data;
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};
