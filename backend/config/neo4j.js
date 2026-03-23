require('dotenv').config();
const neo4j = require('neo4j-driver')
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
        process.env.NEO4J_USER,
        process.env.NEO4J_PASSWORD
    )
)

module.exports = driver



// ------------------------------------------------

// const mongoose = require("mongoose")

// const connectDB = async () => {
//     try {
//         const newConn = await mongoose.connect(process.env.MONGO_URI)
//         console.log(`mongoDB connected ${newConn.connection.host}`);

//         console.log("mongodb connected swapnil.")
//     }
//     catch (err) {
//         console.log(err)
//         process.exit(1)
//     }
// }

// module.exports = connectDB