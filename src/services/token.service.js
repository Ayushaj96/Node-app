const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const httpStatus = require('http-status');

const verifyAuthToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let response = {};

    if (token == null) {
        response.error = "Token not found";
        return next(res.status(httpStatus.UNAUTHORIZED).send(response));

    } else {
        jwt.verify(token, config.JWT_SECRET, (err, user) => {

            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    response.error = "Token expired";
                } else if (err instanceof jwt.JsonWebTokenError) {
                    response.error = "Invalid token";
                }
                return next(res.status(httpStatus.FORBIDDEN).send(response));

            } else {
                req.user = user;
                next();
            }
        });
    }
}

const generateToken = (userId, expires, secret = config.JWT_SECRET) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
};

const generateAuthToken = async(user) => {
    const accessTokenExpires = moment().add(config.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
    const accessToken = generateToken(user, accessTokenExpires);
    return accessToken;
};


module.exports = {
    generateAuthToken,
    verifyAuthToken,
};