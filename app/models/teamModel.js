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
    slug: {
        type: String,
        unique: true,
    },
    date_created: {
        type: Date,
        default: Date.now,
    }


});

function slugify(teamName) {
    if (!(typeof(teamName) == "string"))return
    const text = `${teamName}`;
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

TeamsSchema.pre('save', function(next) {
    this.slug = slugify(this.team_name);
    next();
});
const TeamsModel = mongoose.model('Teams', TeamsSchema);

module.exports = TeamsModel;
