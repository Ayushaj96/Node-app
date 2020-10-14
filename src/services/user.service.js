
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { User , Account } = require('../models');
const ApiError = require('../utils/ApiError');
const csv=require('csvtojson');

let path = __dirname + "/../../upload/";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  let result, salt, hashPassword;
  if (await User.findOne({ username : userBody.username })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UserName already exists');
  }
  // hashed password
  salt = await bcrypt.genSalt();
  hashPassword = await bcrypt.hash(userBody.password, salt);

  userBody.password = hashPassword;

  // generate 8 digit account number
  userBody.accountnumber = Math.round(Math.random() * 100000000);

  const user = await User.create(userBody);
  result = {
    'name' : user.name,
    'username' : user.username,
    'accountno' : user.accountnumber
  }
  return result;  
};

/**
 * Get user by username
 * @param {string} username
 * @returns {Promise<User>}
 */
const getUserByUserName = async (username) => {
  return User.findOne({ username : username });
};

/**
 * Get account details by username
 * @param {string} username
 * @returns {Promise<User>}
 */
const getAccountDetailsByUserName = async (username) => {
  return Account.findOne({ username });
};

const uploadcsv = async (req) => {
    let csvData, accountDetails, creditLimit, result;
    // read csv data
    
    csvData = await csv().fromFile(path + req.file.filename);
    console.log(csvData);
    accountDetails = {
      'username': 'Ayush',
      'transactions': csvData,
      'creditLimit': 0,
      'balance': csvData[csvData.length - 1]['Closing Balance'],
      'rateOfInterest': 0
    }

    const account = await Account.create(accountDetails);

    result = {
      'creditLimit': account.creditLimit,
      'balance': account.balance,
      'rateOfInterest': 0
    }
    return result;
};

module.exports = {
  createUser,
  getUserByUserName,
  uploadcsv,
  getAccountDetailsByUserName,
};
