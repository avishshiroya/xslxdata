const JSONdata = require('../jsondata/file.json');
const testModel = require('../models/test');
const categoryService = require("../services/category");
const fs=require('fs')
module.exports = {
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const checkName = await categoryService.checkcategory(name);
      // console.log(checkName);
      if (checkName) {
        return res.status(406).json({
          status: "error",
          message: "Category Name Allready Added",
          data: [],
        });
      }
      const category = await categoryService.categorySave(name);
      // console.log(category);
      if (!category.name) {
        return res.status(400).json({
          status: "error",
          message: "Category Cannot Added",
          data: [],
        });
      }
      res.status(200).json({
        status: "success",
        message: "category created",
        data: [],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        data: [],
      });
    }
  },
  editCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const findCategory = categoryService.categoryByID(id);
      if (!findCategory) {
        return res.status(404).json({
          staus: "error",
          message: "cannot update category",
          data: [],
        });
      }
      const checkcategory = categoryService.checkCategotyUpdate(id, name);
      if (checkcategory) {
        return res.status(406).json({
          status: "error",
          message: "Category Allreday Added",
          data: [],
        });
      }
      const category = categoryService.categoryUpdate(id, name);
      if (!category) {
        return res.status(400).json({
          status: "error",
          message: "Category Cannoty Update",
          data: [],
        });
      }
      res.status(200).json({
        status: "success",
        message: "Categopry Updated successfully",
        data: [],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        data: null,
      });
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const category = categoryService.allCategory();
      if (!category[0]) {
        return res.status(404).json({
          status: "error",
          message: "category Not Found",
          data: [],
        });
      }
      res.staus(200).json({
        status: "success",
        message: "Categories",
        data: category,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        data: [],
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const checkCategory = categoryService.categoryByID(id);
      if (!checkCategory) {
        return res.status(406).json({
          status: "error",
          message: " Cannot Delete Category",
          data: [],
        });
      }
      const deleteCategory = await categoryService.deleteCategory(id);
      if (!deleteCategory) {
        return res.status(403).json({
          status: "error",
          message: "Category Cannot Delete",
          data: [],
        });
      }
      res.status(200).json({
        status: "success",
        message: "Category Deleted Successfully",
        data: [],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        data: [],
      });
    }
  },
  addJSON: async (req, res) => {
    try {
      const object ={
        "id": "12345",
        "name": "Modern Leather Sofa",
        "description": "A sleek and stylish leather sofa with tufted seats and stainless steel legs.",
        "price": 799.99,
        "category": "Furniture",
        "brand": "XYZ Furniture Co.",
        "color": "Black",
        "material": "Genuine Leather",
        "weight": "120 lbs",
        "dimensions": {
          "length": 80,
          "width": 35,
          "height": 30
        },
        "availability": true,
        "imageURLs": [
          "https://example.com/sofa_front.jpg",
          "https://example.com/sofa_side.jpg",
          "https://example.com/sofa_back.jpg"
        ]
      }
      let data = [];
      for(let i=0;i<100000;i++){
        data.push(object)
      }
      const addData = fs.writeFile('./jsondata/file.json',JSON.stringify(data),(err)=>{
        if(err) {
            console.log(err);
            return res.status(400).json({
                status: "error",
                message: "can't add data",
                data: [],
              });
        }
        else {
            return res.status(200).json({
                status:'success',
                message:'Data Added Successfully',
                data:[]
            })
            
        }
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "INTERNAL SERVER ERROR",
        data: [],
      });
    }
  },
  uploadData:async(req,res)=>{
    try {
        console.log(JSONdata[0]);
       for(let i=0;i<JSONdata.length;i+=1000){
        let data =[]  ;
        console.log(i);
        let p;
        for(let j=i;j<(i+1000);j++){
            p = i;
          data.push(JSONdata[j])
        }
        console.log(p);
        console.log(i);
        await testModel.insertMany(data);
       }
       res.send("added")
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:'success',
            message:'INTERNAL SERVER ERROR',
            data:[]
        })
    }
  }
};
