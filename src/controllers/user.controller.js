const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const upload = catchAsync(async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }
  const user = await userService.uploadcsv(req);
  res.status(httpStatus.CREATED).send({ user });
});

module.exports = {
  upload,
};


// let path = __basedir + "/uploads/" + req.file.filename;
// let data = [], deposit = new Array(LEN).fill(0), withdraw = new Array(LEN).fill(0);
// let info = {};

// fs.createReadStream(path)
//   .pipe(csv.parse({ headers: true }))
//   .on("error", (error) => {
//     throw error.message;
//   })
//   .on("data", (row) => {
//     if(row.Date != ''){
//       data.push(row);
//       var date = row.Date.split('/');
//       if(row.Deposit != ''){
//         deposit[date[0]-1] += parseInt(row.Deposit);
//       }
//       if(row.Withdraw != ''){
//         withdraw[date[0]-1] += parseInt(row.Withdraw);
//       }
//   }
//   }).on("end", () => {   
//     var monthlyBalance = 0;
//     for(var i = 0; i < 12; i++){
//       monthlyBalance += (deposit[i] - withdraw[i]);
//     }
//     monthlyBalance /= LEN;
//     var CreditLimit = monthlyBalance*1.2;
//     var Ac = new Account({
//       username:'Aj',
//       transactions:data,
//       balance : parseInt(data[data.length-1].ClosingBalance),
//       creditLimit : CreditLimit
//     })
//     // save data to Db
//     Ac.save(function(error){
//         if(error){
//              throw error;
//         }
//     });  
//     console.log(" End of file import : ", Ac);
//     info.balance = Ac.balance;
//     info.creditLimit = Ac.creditLimit;
//     res.send({ info });
//   });
// } catch (error) {
// console.log(error);
// res.status(500).send({
//   message: "Could not upload the file: " + req.file.originalname,
// });
// }
// };
