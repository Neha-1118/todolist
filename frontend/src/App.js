import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // ✅ Fetch all tasks
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // ✅ Add a new task
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

  // ✅ Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Neha’s To-Do List</h1>

        <div style={styles.inputBox}>
          <input
            type="text"
            placeholder="Type something and press Add..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            style={styles.input}
          />
          <button style={styles.addBtn} onClick={addTask}>
            Add ➕
          </button>
        </div>

        <div style={styles.listBox}>
          {tasks.length === 0 ? (
            <p style={styles.noTask}>No tasks yet 😴</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} style={styles.task}>
                <span style={styles.taskText}>{task.text}</span>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(task._id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// 💅 Modern Styling
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    fontFamily: "Poppins, sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(15px)",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "450px",
    transition: "all 0.3s ease",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: "2rem",
    marginBottom: "20px",
    letterSpacing: "1px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },
  input: {
    flex: 1,
    padding: "12px 15px",
    borderRadius: "12px",
    border: "none",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  addBtn: {
    padding: "12px 18px",
    borderRadius: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  listBox: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  task: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "12px 18px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "0.3s",
  },
  taskText: {
    fontSize: "1rem",
    color: "#333",
  },
  deleteBtn: {
    background: "#ff4d4d",
    border: "none",
    color: "white",
    borderRadius: "8px",
    width: "35px",
    height: "35px",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  noTask: {
    textAlign: "center",
    color: "#fff",
    fontSize: "1.1rem",
  },
};

export default App;
