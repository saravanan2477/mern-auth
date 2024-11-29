import express from "express";
import mongoose from 'mongoose'
import userRoutes from "./routes/user-route.js";
import authRoutes from "./routes/auth-route.js";
import adminRoutes from "./routes/admin-routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
  console.log('connect to mongos')
}).catch((err)=>{
  console.log(err)
})

const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
