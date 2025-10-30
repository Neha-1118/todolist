import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ CORS: allow React frontend (check your frontend port)
app.use(
  cors({
    origin: "http://localhost:3001", // ⚠️ change this if your React app runs on a different port (check terminal)
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Routes
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Root check
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
