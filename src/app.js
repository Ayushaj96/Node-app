const express = require('express');
const httpStatus = require('http-status');
// const passport = require('passport');
// const { jwtStrategy } = require('./config/passport');
const connectDB = require('./db/connection');
const routes = require('./routes');

// connection To db
connectDB();
const app = express();

global.__basedir = __dirname + "/..";


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

app.use('/v1', routes);

app.listen(3000, () => {
  console.log('Listening To port : 3000');
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(httpStatus.NOT_FOUND);
});

module.exports = app;
