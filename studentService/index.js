const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const studentRoutes = require("./routes/studentRoute")

dotenv.config();

const app = express(); 

connectDB();

app.use(express.json());

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log("THe student service running on port - "+ PORT);
});

