const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminsSchema = new Schema({
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
    is_admin: {
        type: Boolean,
        required: true,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now,
    }


});

const AdminsModel = mongoose.model('Admins', AdminsSchema);

module.exports = AdminsModel;
