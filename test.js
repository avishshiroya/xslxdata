const mongoose = require('mongoose')

const testSchema=new mongoose.Schema({
    "O*NET-SOC Code":{
        type:String,
        required:true
    },
    "Title":{
        type:String,
        required:true
    },
    "Description":{
        type:String,
        required:true
    },
    "Alternate Title":{
        type:Array,
        required:true
    }
    
})
const testModel = mongoose.model('test',testSchema);
module.exports = testModel
