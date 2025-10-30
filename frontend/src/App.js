import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/todos", {
        text: newTask,
      });
      setTasks([res.data, ...tasks]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Neha’s To-Do List</h1>

        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            style={styles.input}
          />
          <button style={styles.addBtn} onClick={addTask}>
            Add
          </button>
        </div>

        <div style={styles.taskList}>
          {tasks.length === 0 ? (
            <p style={styles.emptyText}>No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} style={styles.taskItem}>
                <span style={styles.taskText}>{task.text}</span>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(task._id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f2f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "25px 20px 30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
    fontSize: "1.8rem",
    fontWeight: "600",
  },
  inputRow: {
    display: "flex",
    marginBottom: "20px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  addBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 18px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.2s",
  },
  addBtnHover: {
    backgroundColor: "#0056b3",
  },
  taskList: {
    marginTop: "10px",
  },
  taskItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    padding: "10px 12px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #e0e0e0",
  },
  taskText: {
    color: "#333",
    fontSize: "1rem",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    width: "28px",
    height: "28px",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default App;
