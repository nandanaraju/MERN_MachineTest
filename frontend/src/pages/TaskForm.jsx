
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const[editingTasks, setEditingTasks] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');

  const fetchTasks = async () => {
    try {
        const res = await fetch("/api/tasks", { credentials: "include" });
        if (res.ok) {
            const data = await res.json();
            setTasks(data);
        } else {
            toast.error("Failed to fetch task");
        }
    } catch (error) {
        toast.error("Error fetching tasks");
    }
};

useEffect(() => {
    fetchTasks();
}, []);


    // Add User
    const addTask = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title,description,status,priority}),
                credentials: "include",
            });
            if (res.ok) {
                toast.success("Task added successfully");
                fetchTasks();

                resetForm();
            } else {
                toast.error("Failed to add Task");
            }
        } catch (error) {
            toast.error("Error adding task");
        }
    };

    // Edit User
    const editTasks = (task) => {
        setEditingTasks(task);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
    };

    // Update User
    const updateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/tasks/${editingTasks._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title,description,status,priority }),
                credentials: "include",
            });
            if (res.ok) {
                toast.success("Tasks updated successfully");
                fetchTasks();

                resetForm();
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Error updating task");
        }
    };

   

    // Reset Form
    const resetForm = () => {
        setEditingTasks(null);
        setDescription("");
        setStatus("pending");
        setPriority("medium");
       
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
            <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", backgroundColor: "#ffffff", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" }}>
                <h1 style={{ textAlign: "center", color: "#000", fontSize: "24px", marginBottom: "20px" }}>Tasks Management</h1>

                {/* Add/Edit Tasks Form */}
                <form
                    onSubmit={editingTasks ? updateTask : addTask}
                    style={{
                        padding: "20px",
                        backgroundColor: "#eeeeee",
                        borderRadius: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <h2 style={{ fontSize: "18px", marginBottom: "10px", color: "#333" }}>
                        {editingTasks ? "Edit Task" : "Add a Task"}
                    </h2>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                            required
                        />
                        <label>Description</label>

                        <input
                            type="text"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                            required
                        />
                        <label>Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-progress</option>
                            <option value="completed">Completed</option>

                        </select>
                        <label >Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                marginBottom: "10px",
                            }}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                        }}
                    >
                        {editingTasks ? "Update" : "Add a new task"}
                    </button>
                </form>

                {/* Users List */}
                <h2 style={{ fontSize: "18px", marginBottom: "10px", color: "#333" }}>Manage Tasks</h2>
                <div>
                    {Array.isArray(tasks) &&
                        tasks.map((task) => (
                            <div
                                key={task._id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px",
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: "5px",
                                    border: "1px solid #ddd",
                                    marginBottom: "10px",
                                }}
                            >
                                <div>
                                    <span style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
                                        {tasks.title} ({task.title})
                                    </span>
                                    <span style={{ display: "block", fontSize: "14px", color: "#666" }}>
                                        Description{task.description}
                                    </span>
                                    <span style={{ display: "block", fontSize: "14px", color: "#666" }}>
                                        Status: {task.status}
                                    </span>
                                    <span style={{ display: "block", fontSize: "14px", color: "#666" }}>
                                        Priority {task.priority}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => editTasks(task)}
                                        style={{
                                            backgroundColor: "#ffc107",
                                            color: "#fff",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        style={{
                                            backgroundColor: "#dc3545",
                                            color: "#fff",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TaskForm;

