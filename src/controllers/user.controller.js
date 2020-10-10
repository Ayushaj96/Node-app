const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const test = catchAsync(async (req, res) => {
  const user = await userService.test(req.body);
  res.status(httpStatus.CREATED).send(user);
});


module.exports = {
  test
};