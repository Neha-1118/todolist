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
      setTasks([...tasks, res.data]);
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
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>✨ Neha’s To-Do List ✨</h1>

      <div style={styles.inputBox}>
        <input
          type="text"
          style={styles.input}
          placeholder="✍️ Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button style={styles.addBtn} onClick={addTask}>
          Add
        </button>
      </div>

      <div style={styles.listBox}>
        {tasks.length === 0 ? (
          <p style={styles.noTask}>No tasks yet 😴</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} style={styles.task}>
              <span>{task.text}</span>
              <button style={styles.deleteBtn} onClick={() => deleteTask(task._id)}>
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🎨 Improved Modern UI
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
  },
  heading: {
    color: "#fff",
    fontSize: "2.2rem",
    marginBottom: "20px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "30px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  addBtnHover: {
    backgroundColor: "#0056b3",
  },
  listBox: {
    width: "100%",
    maxWidth: "400px",
  },
  task: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "10px 15px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
  },
  noTask: {
    color: "#fff",
    fontSize: "1.2rem",
  },
};

export default App;
