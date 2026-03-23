const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    studentClass: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
