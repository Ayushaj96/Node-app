const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const upload = catchAsync(async(req, res) => {
    if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
    }
    const user = await userService.uploadcsv(req);
    res.status(httpStatus.CREATED).send({ user });
});

module.exports = {
    upload,
};