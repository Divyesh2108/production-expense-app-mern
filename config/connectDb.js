const mongoose = require('mongoose');

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`server running on${mongoose.connection.host}`.bgYellow.white)
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDb