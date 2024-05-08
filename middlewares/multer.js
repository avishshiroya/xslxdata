const multer = require('multer')

// var excelStore = multer.diskStorage({
//     destination:(req,res,cb)=>{
//         cb(null,'./public')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })

// const fileUploads = multer({storage:excelStore})

// module.exports = fileUploads

const storage= multer.memoryStorage();

module.exports = multer({storage}).single("file");