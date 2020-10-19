const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { User, Account } = require('../models');
const csv = require('csvtojson');

let path = __dirname + "/../../upload/";

const createUser = async(userBody) => {
    let result, salt, hashPassword;
    try {
        if (await User.findOne({ username: userBody.username })) {
            return { status: httpStatus.BAD_REQUEST, error: 'UserName already Exists' };
        }
        // hashed password
        salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(userBody.password, salt);

        userBody.password = hashPassword;

        // generate 8 digit account number
        userBody.accountnumber = Math.round(Math.random() * 100000000);

        const user = await User.create(userBody);
        result = {
            'name': user.name,
            'username': user.username,
            'accountno': user.accountnumber
        }
        return result;
    } catch (err) {
        console.log(err);
        return {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error occured in user Registration'
        };
    }
};


const getCreditLimit = (data) => {

    let monthlyBalance, avgMonthlyBalance, creditLimit, sum = 0;
    monthlyBalance = getMonthlyBalance(data);
    monthlyBalance.forEach((amount) => {
        sum += amount;
    })
    avgMonthlyBalance = (sum / 12);
    creditLimit = avgMonthlyBalance * 1.2;

    return creditLimit;
}

const getMonthlyBalance = (csvData) => {

    let monthlyBalance = new Array(12).fill(0);
    csvData.forEach((data) => {
        let month = parseInt(data.Date.split('/')[0]) - 1;
        if (data.Withdraw !== '') {
            monthlyBalance[month] -= parseInt(data.Withdraw);
        }
        if (data.Deposit !== '') {
            monthlyBalance[month] += parseInt(data.Deposit);
        }
    })
    return monthlyBalance;
}

const uploadcsv = async(req) => {
    let csvData, accountDetails, creditLimit, result;
    try {
        // read csv data
        csvData = await csv().fromFile(path + req.file.filename);
        creditLimit = getCreditLimit(csvData);

        accountDetails = {
            'username': req.user.sub,
            'transactions': csvData,
            'creditLimit': creditLimit,
            'balance': csvData[csvData.length - 1]['Closing Balance'],
            'rateOfInterest': 0
        }

        const account = await Account.create(accountDetails);
        result = {
            'creditLimit': account.creditLimit,
            'balance': account.balance,
            'rateOfInterest': account.rateOfInterest
        }
        return result;
    } catch (error) {
        return {
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error occured in Upload CSV'
        };
    }
};

const getUserByUserName = async(username) => {
    return User.findOne({ username: username });
};

const getAccountDetailsByUserName = async(username) => {
    return Account.findOne({ username });
};

module.exports = {
    createUser,
    getUserByUserName,
    uploadcsv,
    getAccountDetailsByUserName,
};