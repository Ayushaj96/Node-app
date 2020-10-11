const mongoose = require('mongoose');

const user = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});


const User = mongoose.model('user', user);
module.export = User