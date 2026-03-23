const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT;
const connectdb = require("./config/db");
const morgan = require("morgan");
connectdb.connectDB();

const studentRoutes = require("./routes/student");

// middleware
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/student", studentRoutes);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
