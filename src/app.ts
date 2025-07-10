import 'express-async-errors';
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routers/UserRouter";
import authRouter from "./routers/AuthRouter";
import { globalErrorHandler } from "./middleware/errorHandler";
import propertyRouter from "./routers/PropertyRouter";
import { swaggerSpec } from './config/swagger';
import { RouteDebugger } from "./utils/routeDebugger";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use("/api/v1/users", userRouter); 
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/auth", authRouter);

app.use(globalErrorHandler);

mongoose.connect(MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      
      // Debug: Log all registered routes
      // RouteDebugger.logAllRoutes(app);
    });
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
