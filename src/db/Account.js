const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const account = new Schema({
  username: {
    type: String
  },
  transactions: { type : Array , "default" : [] },
  balance : Number,
  creditLimit : Number,
});

module.exports = mongoose.model('Account', account);