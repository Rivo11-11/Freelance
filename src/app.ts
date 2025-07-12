// src/app.ts
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from './routers/UserRouter';
import authRouter from './routers/AuthRouter';
import propertyRouter from './routers/PropertyRouter';
import activityRouter from './routers/ActivityRouter';
import { globalErrorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('✅ Express app running (staging)'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/activities', activityRouter);
app.use(globalErrorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB (staging) connected'))
  .catch(console.error);

module.exports = app;
