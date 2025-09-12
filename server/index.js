import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
// Config
dotenv.config();

import connectDB from "./config/db.js";
// Connect to DB
connectDB();

const app = express();
// Middleware & Body parser
app.use(express.json({ extended: true })); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// CORS config for development
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL })); // For development

// Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



