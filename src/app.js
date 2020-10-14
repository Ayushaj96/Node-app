const express = require('express');
const httpStatus = require('http-status');
const connectDB = require('./db/connection');
const routes = require('./routes');

global.__basedir = __dirname + "/..";

// connection To mongodb Atlas
connectDB();
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);

app.listen(3000, () => {
    console.log('Listening To port : 3000');
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = httpStatus.NOT_FOUND;
    next(err);
});

module.exports = app;