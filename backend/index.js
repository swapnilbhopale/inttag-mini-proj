const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())

app.use('', require('./routes/authRoutes'))

app.listen(3000, () => {
  console.log("server is listing.")
})
