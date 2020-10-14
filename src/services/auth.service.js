const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
const login = async (username, password) => {
  let result;

  const user = await userService.getUserByUserName(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  // get account details
  const accountDetails = await userService.getAccountDetailsByUserName(username);
  if(!accountDetails){
    result = {
      error : 'Please upload csv'
    };
    return result;
  }

  console.log('Details', accountDetails);
  result = {
    'creditLimit' : accountDetails.creditLimit,
    'balance' : accountDetails.balance,
    'rateOfInterest' : accountDetails.rateOfInterest
  }

  return result;
};


module.exports = {
    login,
};
