const express = require('express')
const fileUploads = require('../middlewares/multer')
const { getFileAddData, payment, sendDataOfJson, addJSON, uploadData, unzipTheFile, createCbz } = require('../controllers/user.controllers')

const router = express.Router()

// router.post("/add",fileUploads.single("file"),getFileAddData)
router.post("/payment",payment)
router.get("/success",(req,res)=>{
    res.send("success")
})
router.get("/cancel",(req,res)=>{
    res.send("cancel")
})
router.post('/sendData',sendDataOfJson)
router.post("/madeJSON",addJSON)
router.post("/addData",uploadData)
// router.get("/readData",testData)
router.post('/unzip',fileUploads,unzipTheFile)
router.post('/zip',createCbz)

module.exports = router