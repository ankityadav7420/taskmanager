import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TaskCard from "../components/TaskCard";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  addTask,
  logoutUser,
  fetchUserInfo
} from "../utils/api/tasks";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Snackbar,
  Alert,
  Avatar,
  Menu,
  MenuItem as MuiMenuItem
} from "@mui/material";
import Cookies from "js-cookie";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Pending"
  });
  const [error, setError] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: ""
  });
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const userLogo =
    "https://res.cloudinary.com/dzxyaeoyz/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1725766183/recipesHub/userLogo_ewdsoz.webp";

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token || token === null) {
        router.push("/login");
        return;
      }

      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData?.data);
        setUser(tasksData?.data[0]?.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    checkAuth();
  }, [router]);

  const filteredTasks = tasks?.filter((task) =>
    task?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask?._id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...updatedTask } : task
        )
      );
      showNotification("Task updated successfully", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      showNotification("Error updating task", "error");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      showNotification("Task deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      showNotification("Error deleting task", "error");
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        const success = await logoutUser();

        if (success) {
          Cookies.remove("token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTask = async (e) => {
    e.stopPropagation();
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";

    if (newTask.title?.length <= 5)
      errors.title = "Minimum 5 charecter is required.";

    if (newTask.description?.length <= 15)
      errors.description = "Minimum 15 charecter is required.";

    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    try {
      const createdTask = await addTask(newTask);
      setTasks([...tasks, createdTask.data]);
      setAddOpen(false);
      showNotification("Task added successfully", "success");
      setNewTask({ title: "", description: "", status: "Pending" });
    } catch (error) {
      console.error("Error adding task:", error);
      showNotification("Error adding task", "error");
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
    setTimeout(
      () => setNotification({ open: false, message: "", severity: "" }),
      5000
    );
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      const reorderedTasks = reorder(
        tasks.filter((task) => task.status === source.droppableId),
        source.index,
        destination.index
      );

      const draggedTask = reorderedTasks[destination.index];
      draggedTask.status = destination.droppableId;

      try {
        await updateTask(draggedTask._id, draggedTask);
        setTasks((prevTasks) => [
          ...prevTasks.filter((task) => task._id !== draggedTask._id),
          draggedTask
        ]);

        showNotification("Task status updated", "success");
      } catch (error) {
        console.error("Error updating task status:", error);
        showNotification("Error updating task status", "error");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 relative">
      <Avatar
        src={userLogo}
        alt="User Avatar"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className="cursor-pointer absolute top-4 right-4"
      />
      <Button
        variant="contained"
        color="primary"
        className="mb-4"
        onClick={handleAddOpen}
      >
        Add Task
      </Button>

      <div className="task-container">
        <TextField
          label="Search Tasks..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Pending", "InProgress", "Done"].map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-4 border rounded-md shadow-md"
                  >
                    <div className="bg-blue-400 text-white p-4 mb-2">
                      <h2 className="text-xl font-semibold mb-2">
                        {status.toUpperCase()}
                      </h2>
                    </div>
                    {filteredTasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTask={handleDeleteTask}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!error.title}
            helperText={error.title}
          />
          <TextField
            label="Description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
            error={!!error.description}
            helperText={error.description}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          >
            {["Pending", "InProgress", "Done"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={notification.severity}
          onClose={() =>
            setNotification({ open: false, message: "", severity: "" })
          }
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            width: "200px"
          }
        }}
      >
        {user ? (
          <>
            <MuiMenuItem disabled>
              <strong>{user?.firstname}</strong>
            </MuiMenuItem>
            <MuiMenuItem disabled>{user?.email}</MuiMenuItem>
            <MuiMenuItem onClick={handleLogout} sx={{ color: "red" }}>
              Logout
            </MuiMenuItem>
          </>
        ) : (
          <MuiMenuItem onClick={handleLogout} sx={{ color: "red" }}>
            Logout
          </MuiMenuItem>
        )}
      </Menu>
    </div>
  );
};

export default Tasks;
