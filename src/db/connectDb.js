const mongoose = require('mongoose');


async function connectDb() {

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to db successfully")
    
        
    } catch (error) {
        console.error(error);
        console.log("error connecting to db")
    
    }
    
}

module.exports = connectDb;