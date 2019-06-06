const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const FixtureSchema = new Schema({
    home_team: {
        type: String,
        required: true,
        lowercase: true
    },
    away_team: {
        type: String,
        required: true,
        lowercase: true
    },
    home_team_scores: {
        type: Number,
        default: 0
    },
    away_team_scores: {
        type: Number,
        default: 0
    },
    match_period: {
        type: String,
        enum: ['First Half', 'Half Time', 'Second Half', 'Full Time']
    },
    match_date: {
        type: Date,
        required: true,
        index: true
    },
    match_week: {
        type: Number,
        required: true,
        index: true,
        min: 1,
        max: 38
    },
    match_time:{
        type: String,
        required: true,
        index: true
    },
    match_stadium: {
        type: String,
        required: true
    },
    match_status: {
        type: String,
        default: 'pending'
    },
    slug: {
        type: String,
        unique: true
    },
    date_created: {
        type: Date,
        default: Date.now,
    }
});


function slugify(homeTeam, awayTeam) {
    if (!(typeof(homeTeam) == "string" && typeof (awayTeam) == "string"))return
    const text = `${homeTeam} 'vs' ${awayTeam}`;
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

FixtureSchema.pre('save', function(next) {
    this.slug = slugify(this.home_team, this.away_team);
    next();
});

const FixtureModel = mongoose.model('Fixtures', FixtureSchema);

module.exports = FixtureModel;
