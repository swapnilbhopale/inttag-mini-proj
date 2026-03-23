const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const app = express()
// const connectDB = require("./config/neo4j")

dotenv.config()
// connectDB()

app.use(cors())
app.use(express.json())

app.use('', require('./routes/authRoutes'))

app.listen(3000, () => {
  console.log("server is listing.")
})
