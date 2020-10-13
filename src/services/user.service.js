
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const csv=require('csvtojson');

let path = __basedir + "/upload/";
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
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByUserName = async (username) => {
  return User.findOne({ username : username });
};

const uploadcsv = async (req) => {
    let csvData;
    // read csv data
    csvData = await csv().fromFile(path + req.filename);
  
    return '';
};

module.exports = {
  createUser,
  getUserByUserName,
  uploadcsv,
};
