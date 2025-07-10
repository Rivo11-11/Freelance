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

// Swagger JSON endpoint (works on Vercel)
app.get('/swagger.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Redirect /api-docs to external Swagger UI viewer
app.get('/api-docs', (req, res) => {
  const swaggerUrl = `${req.protocol}://${req.get('host')}/swagger.json`;
  const externalViewerUrl = `https://editor.swagger.io/?url=${encodeURIComponent(swaggerUrl)}`;
  res.redirect(externalViewerUrl);
});

// Alternative: Serve a simple HTML page with embedded Swagger UI
app.get('/docs', (req, res) => {
  const swaggerUrl = `${req.protocol}://${req.get('host')}/swagger.json`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Luby API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
      <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = function() {
          const ui = SwaggerUIBundle({
            url: '${swaggerUrl}',
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
    </html>
  `;
  res.send(html);
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
      console.log(`📚 API Documentation available at:`);
      console.log(`   - JSON: http://localhost:${PORT}/swagger.json`);
      console.log(`   - Docs: http://localhost:${PORT}/docs`);
      console.log(`   - External: http://localhost:${PORT}/api-docs`);
      
      // Debug: Log all registered routes
      // RouteDebugger.logAllRoutes(app);
    });
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
