const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const account = new Schema({
  username: {
    type: String,
    required: true,
  },
  transactions: { 
    type : Array , 
    "default" : [] 
  },
  balance : {
    type: Number,
    required: true,
  },
  creditLimit :  {
    type: Number,
    required: true,
  },
  rateOfInterest : {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model('Account', account);

module.exports = Account;
