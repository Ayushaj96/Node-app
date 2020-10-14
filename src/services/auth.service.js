const httpStatus = require('http-status');
const userService = require('./user.service');

const login = async(username, password) => {
    let result;

    const user = await userService.getUserByUserName(username);
    if (!user || !(await user.isPasswordMatch(password))) {
        return { status: httpStatus.UNAUTHORIZED, error: 'Incorrect username or password' };
    }

    // get account details
    const accountDetails = await userService.getAccountDetailsByUserName(username);
    if (!accountDetails) {
        return { msg: 'Please upload csv' };
    }

    result = {
        'creditLimit': accountDetails.creditLimit,
        'balance': accountDetails.balance,
        'rateOfInterest': accountDetails.rateOfInterest
    }

    return result;
};

module.exports = {
    login,
};