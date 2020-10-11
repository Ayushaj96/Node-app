const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const fs = require("fs");
const csv = require("fast-csv");

const Account  = require('../db/Account');

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let path = __basedir + "/uploads/" + req.file.filename;
    
    let data = []
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        data.push(row)
      }).on("end", () => {   
        var Ac = new Account({
          username:'Aj',
          transactions:data
        })
        Ac.save(function(error){
          console.log(Ac);
            if(error){
                 throw error;
            }
        });  
        console.log(" End of file import");
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
  res.send('done');
};

const test = catchAsync(async (req, res) => {
  const user = await userService.test(req.body);
  res.status(httpStatus.CREATED).send(user);
});


module.exports = {
  test, 
  upload
};