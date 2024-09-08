const express = require("express");
const {
  addTask,
  getTasks,
  getTasksById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const isAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();

// all task routes with authentication middleware
router.post("/tasks", isAuthenticated, addTask);
router.get("/tasks", isAuthenticated, getTasks);
router.get("/tasks/:id", isAuthenticated, getTasksById);
router.put("/tasks/:id", isAuthenticated, updateTask);
router.delete("/tasks/:id", isAuthenticated, deleteTask);

module.exports = router;
