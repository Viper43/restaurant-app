const mongoose = require('mongoose')

// mongodb connection
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connected' + mongoose.connection.host)
    } catch (error) {
        console.log('DB connection failes' + error)        
    }
}

module.exports = dbConnection