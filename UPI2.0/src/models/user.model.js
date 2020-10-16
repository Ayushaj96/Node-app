const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    accountnumber: {
        type: Number,
        required: true
    },
});

userSchema.methods.isPasswordMatch = async function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};


const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;