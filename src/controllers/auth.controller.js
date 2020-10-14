const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync(async(req, res) => {

    const user = await userService.createUser(req.body);
    if (user.error) {
        const error = user.error;
        return res.status(user.status).send({ error });
    }
    res.status(httpStatus.CREATED).send({ user });

});

const login = catchAsync(async(req, res) => {
    const { username, password } = req.body;
    const user = await authService.login(username, password);
    if (user.error) {
        const error = user.error;
        return res.status(user.status).send({ error });
    }
    const token = await tokenService.generateAuthToken(username);
    res.send({ user, token });
});

module.exports = {
    register,
    login,
};