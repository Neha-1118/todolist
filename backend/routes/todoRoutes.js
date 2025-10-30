import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Define Schema
const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Create Model
const Todo = mongoose.model("Todo", todoSchema);

// ✅ GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error("GET / error:", err);
    res.status(500).json({ message: "Server error fetching todos" });
  }
});

// ✅ POST create new todo
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "")
      return res.status(400).json({ message: "Text is required" });

    const newTodo = new Todo({ text });
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({ message: "Server error adding todo" });
  }
});

// ✅ DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("DELETE / error:", err);
    res.status(500).json({ message: "Server error deleting todo" });
  }
});

export default router;
