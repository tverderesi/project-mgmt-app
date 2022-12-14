const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`MongoDB Connected at ${conn.connection.host}`)
    
}

module.exports = connectDB