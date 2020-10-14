const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');

const generateToken = (userId, expires, secret = config.JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
  const accessToken = generateToken(user.GLN, accessTokenExpires);
  return accessToken;
};

const verifyAuthToken = async(req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let response = {};

    if (token == null) {
        response.status = httpStatus.UNAUTHORIZED;
        response.message = httpStatus[httpStatus.UNAUTHORIZED];
        response.data = "Token not found";
        return next(res.status(response.status).send(response));
    } else {

        jwt.verify(token, config.JWT_SECRET,(err, user) => {

            if (err) {
                response.status = httpStatus.FORBIDDEN;
                response.message = httpStatus[httpStatus.FORBIDDEN];

                if (err instanceof jwt.TokenExpiredError) {
                    response.data = "Token expired";
                } else if (err instanceof jwt.JsonWebTokenError) {
                    response.data = "Invalid token";
                }
                return next(res.status(response.status).send(response));

            } else {
                req.user = user;
                next();
            }
        });
    }
}

module.exports = {
  generateAuthTokens,
  verifyAuthToken,
};
