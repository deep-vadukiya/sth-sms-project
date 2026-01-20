const express = require("express");

const Student = require("../models/student");

const { verifyRole, restrictStudentToOwnData } = require("./auth/util");
const { ROLES } = require("../../consts");

const router = express.Router();

router.post("/", async (req, res) => {
    const {name, email, password} = req.body; 

    if(!name || !email || !password){
        return res.status(400).json({message:"Please provide the details"});
    }

    try{
        const existingStudent = await Student.findOne({email});
        if(existingStudent){
            return res.status(400).json({message: "This mail exists"});
        }

        const newStudent = new Student({name, email, password});
        await newStudent.save();
        res.status(201).json(newStudent);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:"Unable to create student"})
    }
});

router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Unable to fetch students" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Unable to fetch student details" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id, 
            { name, email, password }, 
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Unable to update student" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Unable to delete student" });
    }
});

module.exports = router;
