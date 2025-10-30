import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add task
  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post("http://localhost:5000/api/todos", { title: newTask })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.log(err));
    setNewTask("");
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div className="app-container">
      <h1>📝 ToDo List</h1>
      <div className="input-section">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
