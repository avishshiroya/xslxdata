
const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  // "Product Name":{
  //     type:String,
  //     required:true
  // },
  // "Description":{
  //     type:String,
  //     required:true
  // },
  // "Price":{
  //     type:String,
  //     required:true
  // },
  // "Category":{
  //     type:String,
  //     required:true
  // },
  // "Image URL":{
  //      type:String,
  //      required:true
  // }

  id: {
        type:String,
        required:true
    },
  name: {
    type:String,
    required:true
},
  description: {
    type:String,
    required:true
},
  price:  {
    type:String,
    required:true
},
  category: {
    type:String,
    required:true
},
  brand:  {
    type:String,
    required:true
},
  color:  {
    type:String,
    required:true
},
  material:  {
    type:String,
    required:true
},
  weight: {
    type:String,
    required:true
},
  dimensions: {
    length:  {
        type:String,
        required:true
    },
    width:  {
        type:String,
        required:true
    },
    height: {
        type:String,
        required:true
    },
  },
  availability: {
    type:Boolean,
    required:true
},
  imageURLs: [ {
    type:String,
    required:true
}, ],
});

const testModel = mongoose.model("Test", testSchema);
module.exports = testModel;
