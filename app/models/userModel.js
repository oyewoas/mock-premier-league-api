const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    date_created: {
        type: Date,
        default: Date.now,
    }


});

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;
