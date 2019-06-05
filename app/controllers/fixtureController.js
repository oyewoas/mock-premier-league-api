const FixtureModel = require('../models/fixtureModel');
const status = require('../helpers/statuses');
const messages = require('../helpers/messages');
const errorCodes = require('../helpers/errorCodes');

const addFixtures = async (req, res) => {
    try {
        const fixture = await FixtureModel.create(req.body);
        const response = fixture.toJSON();

        res.status(200).json({
            status: status.ok,
            message: messages.addFixture.success,
            data: { fixture: response },
        });
    } catch (err) {
        console.log(err);
        if (err.code === errorCodes.duplicateCode){
            res.status(409).json({
                status: status.conflict,
                message: messages.addFixture.duplicateFixture
            });
        } else {
            res.status(500).json({
                status: status.error,
                message: messages.addFixture.error
            });
        }

    }
};


const editFixtures = async (req, res) => {
    try {
        const fixtureSlug= req.params.slug
        const fixture = await FixtureModel.findOne({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editFixture.notfound
                })
            }
        });
        if (!fixture) {
            res.status(404).json({
                status: status.notfound,
                message: messages.editFixture.notfound
            })
        }
        res.status(200).json({
            status: status.ok,
            messages: messages.editFixture.success,
            data: {fixture}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.editFixture.error
        });
    }
};

const viewFixtures = async (req, res) => {
    try {
        const fixtures = await FixtureModel.find();
        if (!fixtures) {
            res.status(404).json({
                status: status.notfound,
                message: messages.viewFixture.notfound
            })
        }
        res.status(200).json({
            status: status.ok,
            message: messages.viewFixture.success,
            data: {fixtures}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.viewFixture.error
        });
    }
};

const updateFixtures = async (req, res) => {
    try {
        const fixtureSlug= req.params.slug
        const fixture = await FixtureModel.findOne({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editFixture.notfound
                })
            }
        });
        if (!fixture) {
            res.status(404).json({
                status: status.notfound,
                message: messages.updateFixture.notfound
            })
        } else {
            fixture.home_team = req.body.home_team;
            fixture.away_team = req.body.away_team;
            fixture.home_team_scores = req.body.home_team_scores;
            fixture.away_team_scores = req.body.away_team_scores;
            fixture.match_period = req.body.match_period;
            fixture.match_date = req.body.match_date;
            fixture.match_week = req.body.match_week;
            fixture.match_time = req.body.match_time;
            fixture.match_stadium = req.body.match_stadium;
            fixture.match_status = req.body.match_status
            fixture.save();
        }
        res.status(200).json({
            status: status.ok,
            messages: messages.updateTeam.success,
            data: {fixture}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.updateTeam.error
        });
    }
};


const removeFixtures = async (req, res) => {
    try {
        const fixtureSlug= req.params.slug
        const findFixture = await FixtureModel.findOne({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editFixture.notfound
                })
            }
        });
        if (!findFixture) {
            res.status(404).json({
                status: status.notfound,
                message: messages.updateFixture.notfound
            })
        }

        const fixture = await FixtureModel.findOneAndDelete({slug: fixtureSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editFixture.notfound
                })
            }
        });
        if (!fixture) {
            res.status(200).json({
                status: status.ok,
                message: messages.removeFixture.success
            })
        }

    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.removeFixture.error
        });
    }
};


module.exports = {
    addFixtures,
    editFixtures,
    updateFixtures,
    removeFixtures,
    viewFixtures,
};
