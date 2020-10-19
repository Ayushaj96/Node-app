const mongoose = require('mongoose');
const config = require('../config/config');
// Add mongoDB URI
// const URI = 'mongodb+srv://' + config.userName + ':' + config.Password + '#################' + config.dbName + '?retryWrites=true&w=majority';

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
    console.log('db connected..!');
};

module.exports = connectDB;
