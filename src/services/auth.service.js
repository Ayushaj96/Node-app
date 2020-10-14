const httpStatus = require('http-status');
const userService = require('./user.service');

const login = async(username, password) => {
    let result;

    const user = await userService.getUserByUserName(username);
    if (!user || !(await user.isPasswordMatch(password))) {
        result = {
            error: 'Incorrect email or password'
        };
        return result;
    }

    // get account details
    const accountDetails = await userService.getAccountDetailsByUserName(username);
    if (!accountDetails) {
        result = {
            error: 'Please upload csv'
        };
        return httpStatus.UNAUTHORIZED, result;
    }

    console.log('Details', accountDetails);
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