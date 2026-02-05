const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Convert email to lowercase
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
  } catch (error) {
    next(error);
  }
});

// Create the Student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
