import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
//import fileUpload from "express-fileupload";
import { authRouter } from './routes/index.js';
import HttpResponse from "./utils/HttpResponse.js";

// Config
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware & Body parser
app.use(express.json({ extended: true })); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// CORS config for development
//app.use(cors({ credentials: true, origin: process.env.CLIENT_URL })); // For development

// File upload config
//app.use(fileUpload()); // For parsing multipart/form-data
//app.use('/uploads', express.static('uploads')); // For serving static files

// Routes
app.use(`/api/${process.env.API_VERSION}/auth`, authRouter);

// Error handler
app.use((req, res, next) => HttpResponse.notFound(res));
app.use((err, req, res, next) => HttpResponse.serverError(res, err.message));

// Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
