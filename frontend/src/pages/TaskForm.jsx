// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const TaskForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [status, setStatus] = useState('pending');
//   const [priority, setPriority] = useState('medium');

//   const navigate = useNavigate();

//   const submitForm = (e) => {
//     e.preventDefault();

//     const newTask = {
//       title,
//       description,
//       status,
//       priority,
//     };

//     const res = addTask(newTask);
//     toast.success("Task added successfully");
//     navigate("/task");
//     console.log(res);
//   };

//   const addTask = async (newTask) => {
//     const res = await fetch("api/tasks", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newTask),
//     });
//     return res;
//   };

//   return (
//     <div>
//       <div className="container m-auto max-w-2xl py-2">
//       <h1>Add Task</h1>

//       <form onSubmit={submitForm}>
//         <div>
//           <label>Task Title:</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title"
//             className="border rounded w-full py-2 px-3"

//           />
//         </div>
//         <div>
//           <label>Task Description:</label>
//           <input
//             type="text"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             className="border rounded w-full py-2 px-3"

//           />
//         </div>
//         <div>
//           <label>Task Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="border rounded w-full py-2 px-3"

//           >
//             <option value="pending">Pending</option>
//             <option value="in-progress">In-Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
//         <div>
//           <label>Task Priority</label>
//           <select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             className="border rounded w-full py-2 px-3"

//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>

//         <div>
//                 <button
//                   className="bg-blue-500 hover:bg-blue-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
//                   type="submit"
//                 >
//                   Add Task
//                 </button>
//               </div>
//       </form>
//       </div>

//     </div>
//   );
// };

// export default TaskForm;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const[editingTasks, setEditingTasks] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');



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
                            <option value="user">Pending</option>
                            <option value="pharmacist">In-progress</option>
                            <option value="pharmacist">Completed</option>

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
                                        {task.title} ({task.title})
                                    </span>
                                    <span style={{ display: "block", fontSize: "14px", color: "#666" }}>
                                        Status: {user.status}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => editUser(user)}
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

export default AdminDashboard;

