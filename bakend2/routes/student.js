const express = require("express");
const router = express.Router();
const Student = require("../models/students");

// app.get("/", (req, res) => {
//   res.send("app is working.");
// });

//post
router.post("/", async (req, res) => {
  try {
    const { name, age, email, studentClass, address, phone } = req.body;
    const newStudent = new Student({
      name,
      age,
      email,
      studentClass,
      address,
      phone,
    });
    if (!name || !age || !email || !studentClass || !address || !phone) {
      return res.status(400).json({ message: "all filds are requird." });
    }
    const existingStundet = await Student.findOne({ email });
    if (existingStundet) {
      return res
        .status(400)
        .json({ message: "student already exists with this email." });
    }

    const savedStudent = await newStudent.save();
    res.status(201).json({
      message: "Student created successfully.",
      student: savedStudent,
      status: success,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
