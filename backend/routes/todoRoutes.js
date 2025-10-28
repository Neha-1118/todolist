import express from "express";
const router = express.Router();

let todos = []; // In-memory storage

// GET all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// POST new todo
router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: "Task is required" });

  const newTodo = { id: Date.now(), task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT toggle todo completed
router.put("/:id", (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.completed = !todo.completed;
  res.json(todo);
});

// DELETE a todo
router.delete("/:id", (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.json({ message: "Todo deleted" });
});

export default router;
