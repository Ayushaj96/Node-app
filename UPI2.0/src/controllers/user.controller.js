const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { NOT_EXTENDED } = require('http-status');

const upload = catchAsync(async(req, res) => {
    if (req.file == undefined) {
        return res.status(400).send({ error: 'Please upload a CSV file!' });
    }
    const user = await userService.uploadcsv(req);
    if (user.error) {
        const error = user.error;
        return res.status(user.status).send({ error });
    }
    res.status(httpStatus.CREATED).send({ user });

});

module.exports = {
    upload,
};