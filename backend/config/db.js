const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const newConn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected ${newConn.connection.host}`);

        console.log("mongodb connected swapnil.")
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB