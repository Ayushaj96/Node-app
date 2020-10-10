const express = require('express');
const httpStatus = require('http-status');
// const passport = require('passport');
// const { jwtStrategy } = require('./config/passport');
const routes = require('./routes');

const app = express();

// parse json request body
app.use(express.json());

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('', routes);

app.listen(3000, () => {
  console.log('Listening To port : 3000');
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(httpStatus.NOT_FOUND);
});

module.exports = app;
