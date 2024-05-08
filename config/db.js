const mongoose = require('mongoose');

const connectDB = async(req,res)=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        mongoose.connection.on("connected",(err,res)=>{
          console.log("Db Connected");
        })  
        
    } catch (error) {
        console.log("Error in Connect Db  = " + error.message);
    }
}

module.exports = connectDB