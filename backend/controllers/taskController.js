const Task = require("../models/TaskModel");

// Add a new task
exports.addTask = async (req, res) => {
  const { title, description, status } = req.body;

  const userId = req.user.id;
  if (!title || title.length < 5 || !description || description.length < 15) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input data" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      user: userId
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ user: userId })
      .skip(skip)
      .limit(limit)
      .populate("user");

    const count = await Task.countDocuments({ user: userId }); // Count only the user's tasks
    res.status(200).json({ success: true, count, data: tasks });
  } catch (error) {
    next(error);
  }
};
// Get a task by ID
exports.getTasksById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return res
        .status(404)
        .json({ success: false, message: "Task ID not provided" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const { user, ...updatedData } = req.body;
    Object.assign(task, updatedData);

    await task.save();
    await task.populate("user");

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return res
        .status(404)
        .json({ success: false, message: "Task ID not provided" });
    }

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
