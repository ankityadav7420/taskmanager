import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem
} from "@mui/material";

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDetailsOpen = () => setDetailsOpen(true);
  const handleDetailsClose = () => setDetailsOpen(false);

  const handleEditChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateTask = () => {
    onUpdateTask(editedTask);
    handleEditClose();
  };

  const handleDeleteTask = () => {
    onDeleteTask(task._id);
    handleDeleteClose();
  };

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className="shadow-lg rounded-lg hover:shadow-xl transition duration-300 border border-gray-200 h-full">
        <CardContent className="p-4">
          <Typography
            variant="h6"
            component="h3"
            className="font-semibold text-gray-800 mb-2"
            sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {truncateText(task.title, 50)}
          </Typography>

          <Typography
            variant="body2"
            className="text-gray-600 mb-4"
            sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {truncateText(task.description, 200)}
          </Typography>

          <Typography variant="caption" className="text-gray-400">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </Typography>

          <div className="flex space-x-4 mt-6">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleEditOpen}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDeleteOpen}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleDetailsOpen}
            >
              View Details
            </Button>
          </div>
        </CardContent>

        {/* Edit Task Dialog */}
        <Dialog
          open={editOpen}
          onClose={handleEditClose}
          maxWidth="md"
          fullWidth={false}
          sx={{
            "& .MuiDialog-paper": {
              width: "100%",
              maxWidth: "600px",
              padding: "20px"
            }
          }}
        >
          <DialogTitle className="text-3xl">Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              value={editedTask.title}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              multiline
              minRows={2}
            />
            <TextField
              label="Description"
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
              multiline
              minRows={4}
            />
            <TextField
              select
              label="Status"
              name="status"
              value={editedTask.status}
              onChange={handleEditChange}
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
            <Button
              variant="outlined"
              onClick={handleEditClose}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdateTask}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteOpen} onClose={handleDeleteClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteTask}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Task Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={handleDetailsClose}
          maxWidth="md"
          fullWidth={false}
          sx={{
            "& .MuiDialog-paper": {
              width: "100%",
              maxWidth: "600px",
              padding: "20px"
            }
          }}
        >
          <DialogTitle className="text-3xl">Task Details</DialogTitle>
          <DialogContent
            dividers={scroll === "paper"}
            className="overflow-scroll"
            // sx={{
            //   height: "100%",
            //   maxHeight: "400px",
            //   overflowY: "auto",
            //   paddingRight: "10px"
            // }}
          >
            <Typography variant="h5">{task?.title}</Typography>
            <Typography variant="body2" className="mt-2">
              {task?.description}
            </Typography>
            <Typography variant="caption" className="text-gray-400 mt-4">
              Created at: {new Date(task.createdAt).toLocaleString()}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleDetailsClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default TaskCard;
