import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

// ✅ allow all localhost ports
app.use(cors({
  origin: [/^http:\/\/localhost:\d+$/],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use("/api/todos", todoRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
