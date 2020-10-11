const mongoose = require('mongoose');

const URI ="mongodb+srv://admin:admin@cluster0.sxjfb.mongodb.net/UPI?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;