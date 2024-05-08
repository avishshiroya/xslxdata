const csvtojson = require("csvtojson");
const JSONdata = require("../data.json");
const userModel = require("../models/user");
const Stripe = require("stripe");
const data = require("../data.json");
const testModel = require("../models/test");
const jsonStream = require("JSONStream");
const fs = require("fs");
const admzip = require("adm-zip");
const archiver = require('archiver')
const stripe = Stripe(
  "sk_test_51P5gL8SEVqunBl3hKmiwrKankEgXveoEBWPY9tRZfESZkt9CkPpx4eWYl4b2GK9PbiZMruHSXRERpkFTZN4dN6O400GDnqUEwC"
);
const getFileAddData = async (req, res) => {
  try {
    console.log("run");
    const filePath = "./public/" + req.file.filename;
    console.log(filePath);
    var dataOfFile = [];
    await csvtojson()
      .fromFile(filePath)
      .then(async (source) => {
        for (let i = 0; i < source.length; i++) {
          var row = {
            name: source[i]["name"],
            desc: source[i]["desc"],
          };
          console.log(row);
          dataOfFile.push(row);
          console.log(dataOfFile);
        }
        console.log(dataOfFile);
        const addData = await userModel.insertMany(dataOfFile);
        if (addData.length <= 0) {
          return res.status(413).json({
            status: "error",
            message: "Cannnot Add the Data",
            data: [],
          });
        }
      });
    res.status(201).json({
      status: "success",
      message: "data Added Successfully",
      data: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: [],
    });
  }
};

const payment = async (req, res) => {
  try {
    console.log(req.body.stripeToken);
    console.log(process.env.STRIPE_SECRET_KEY);
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    });
    console.log("==========");
    console.log(customer);
    const trans = await stripe.charges.create({
      amount: 2500,
      currency: "USD",
      customer: customer.id,
      description: `charges of ${req.body.stripeEmail}`,
    });
    console.log(trans);
    res.json({ customer, trans });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error in the payment process",
      error: error,
    });
  }
};

//for the save The Data in the Json File To mongodb

// for (let i = 0; i < data.length; i++) {
//   const test = new testModel({
//     "O*NET-SOC Code": data[i]["O*NET-SOC Code"],
//     "Title": data[i]["Title"],
//     "Description": data[i]["Description"],
//     "Alternate Title": data[i]["Alternate Title"],
//   });
//   await test.save()
//   test.save().catch((err) => {
//     if (err) {
//       res.status(413).json({
//         status: "error",
//         message: "Cannot Save Data",
//         data: [],
//       });
//     }
//   });
// }
const sendDataOfJson = async (req, res) => {
  try {
    if (!data[0]) {
      return res.status(400).json({
        status: "error",
        message: "Data Cannot Be Blank",
        data: [],
      });
    }
    const saveData = await testModel.insertMany(data);
    // console.log(saveData[0]);
    if (!saveData[0]) {
      req.flash("msg", "cannot Save Data");
      return res.status(413).json({
        status: "error",
        message: "Cannot Save Data",
        data: [],
      });
    }
    req.flash("msg", "Data Saved Successfully");
    // res.status(200).json({
    //   status: "success",
    //   message: "All Data Save Successfully",
    //   data: [],
    // });
    res.render("Data");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      data: [],
    });
  }
};
const addJSON = async (req, res) => {
  try {
    const object = {
      id: "12345",
      name: "Modern Leather Sofa",
      description:
        "A sleek and stylish leather sofa with tufted seats and stainless steel legs.",
      price: 799.99,
      category: "Furniture",
      brand: "XYZ Furniture Co.",
      color: "Black",
      material: "Genuine Leather",
      weight: "120 lbs",
      dimensions: {
        length: 80,
        width: 35,
        height: 30,
      },
      availability: true,
      imageURLs: [
        "https://example.com/sofa_front.jpg",
        "https://example.com/sofa_side.jpg",
        "https://example.com/sofa_back.jpg",
      ],
    };
    let data = [];
    for (let i = 0; i < 100000; i++) {
      data.push(object);
    }
    const addData = fs.writeFile(
      "./jsondata/file.json",
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            status: "error",
            message: "can't add data",
            data: [],
          });
        } else {
          return res.status(200).json({
            status: "success",
            message: "Data Added Successfully",
            data: [],
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "INTERNAL SERVER ERROR",
      data: [],
    });
  }
};
const uploadData = async (req, res) => {
  try {
    console.log(JSONdata[0]);
    for (let i = 0; i < JSONdata.length; i += 1000) {
      let data = [];
      console.log(i);
      let p;
      for (let j = i; j < i + 1000; j++) {
        p = i;
        data.push(JSONdata[j]);
      }
      console.log(p);
      console.log(i);
      await testModel.insertMany(data);
    }
    res.send("added");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "success",
      message: "INTERNAL SERVER ERROR",
      data: [],
    });
  }
};

const testData = async (req, res) => {
  const stream = jsonStream.parse(["rows"]);
};

const unzipTheFile = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    const unzip = new admzip(req.file.buffer);
    await unzip.extractAllTo(`./public/${req.body.name}/${req.body.lang}`)
    res.status(200).json({
      status: "success",
      message: "Data Added",
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
};

const createCbz= async(req,res)=>{

// Directory containing your images
const imageDir = './public/comics/av';

// Output CBZ file name
const cbzFile = './comic.cbz';

// Create a new ZIP archive
const output = fs.createWriteStream(cbzFile);
const archive = archiver('zip', {
  zlib: { level: 9 } // Set compression level
});

// Listen for archive warnings
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
    console.warn(err);
  } else {
    // throw error
    throw err;
  }
});

// Listen for when the archive has been finalized
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('CBZ file created successfully.');
});

// Listen for errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Add images to the archive
fs.readdir(imageDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    archive.file(`${imageDir}/${file}`, { name: file });
  });

  // Finalize the archive
  archive.finalize();
});
res.status(200).json({
  message:'cbz created'
})

}

module.exports = {
  getFileAddData,
  payment,
  sendDataOfJson,
  addJSON,
  uploadData,
  testData,
  unzipTheFile,
  createCbz
};
