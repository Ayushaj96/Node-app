const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const account = await authService.login(username, password);
  const token = await tokenService.generateAuthTokens(username);
  res.send({ account, token });
});

module.exports = {
  register,
  login,
};
