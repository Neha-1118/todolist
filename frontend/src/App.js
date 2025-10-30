import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // ✅ Backend URL (make sure backend is on port 5000)
  const API_URL = "http://localhost:5000/api/todos";

  // Fetch tasks on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // ✅ Add task (on button click or Enter)
  const addTask = async () => {
    if (!newTask.trim()) return; // prevent empty input
    try {
      const res = await axios.post(API_URL, { text: newTask });
      setTasks([...tasks, res.data]); // add new task to list
      setNewTask(""); // clear input
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 To-Do List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          ➕ Add
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task._id} style={styles.listItem}>
            {task.text}
            <button onClick={() => deleteTask(task._id)} style={styles.delete}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Simple inline styles for UI
const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    textAlign: "center",
    background: "#f4f4f4",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: { marginBottom: "20px", color: "#333" },
  inputContainer: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  input: {
    width: "70%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    background: "white",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  delete: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
