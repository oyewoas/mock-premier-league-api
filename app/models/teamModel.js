const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamsSchema = new Schema({
    team_name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    manager: {
        type: String,
        required: true
    },
    website: {
        type: String,
        unique: true,
    },
    stadium: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    }


});

const TeamsModel = mongoose.model('Teams', TeamsSchema);

module.exports = TeamsModel;
