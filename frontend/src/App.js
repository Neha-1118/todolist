import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post("http://localhost:5000/api/todos", { text: newTask })
      .then(res => {
        setTasks([...tasks, res.data]);
        setNewTask("");
      })
      .catch(err => console.error(err));
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Neha’s To-Do App</h1>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button style={styles.addButton} onClick={addTask}>Add</button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task._id} style={styles.listItem}>
            <span>{task.text}</span>
            <button style={styles.deleteButton} onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: {
    color: "#333",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    width: "70%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginRight: "10px"
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    marginBottom: "10px",
    padding: "10px 15px",
    borderRadius: "5px",
    border: "1px solid #eee"
  },
  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default App;
