const express = require("express");
const dotenv = require("dotenv");
const rateLimit = require('express-rate-limit');

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoute");
dotenv.config(); // Load environment variables
const app = express();

connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON requests

//Route for student operations
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Student Service is running on port ${PORT}`);
});