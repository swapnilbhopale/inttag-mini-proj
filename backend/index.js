const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('', require('./routes/authRoutes'))
app.use('', require('./routes/dataRoutes'))
app.use('', require('./routes/movieRoutes'))

app.listen(3000, () => {
  console.log("server is listing.")
})
