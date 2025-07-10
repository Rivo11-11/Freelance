import 'express-async-errors';
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routers/UserRouter";
import authRouter from "./routers/AuthRouter";
import { globalErrorHandler } from "./middleware/errorHandler";
import propertyRouter from "./routers/PropertyRouter";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { RouteDebugger } from "./utils/routeDebugger";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Create a new route for swagger docs
app.get('/api-docs', (_, res) => {
  const swaggerUIHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
  <style>
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin:0; background: #fafafa; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: window.location.origin + '/swagger.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(swaggerUIHTML);
});
// Middleware
app.use(express.json());
app.use(morgan('dev'));

// swagger
app.get('/swagger.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec)
});
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
