const TeamsModel = require('../models/teamModel');
const status = require('../helpers/statuses');
const messages = require('../helpers/messages');
const errorCodes = require('../helpers/errorCodes');


const addTeams = async (req, res) => {
    try {
        const team = await TeamsModel.create(req.body);
        const response = team.toJSON();

        res.status(200).json({
            status: status.ok,
            message: messages.addTeam.success,
            data: { team: response },
        });
    } catch (err) {
        console.log(err);

        if (err.code === errorCodes.duplicateCode){
            res.status(409).json({
                status: status.conflict,
                message: messages.addTeam.duplicateTeam
            });
        } else {
            res.status(500).json({
                status: status.error,
                message: messages.addTeam.error
            });
        }
    }
};


const editTeams = async (req, res) => {
    try {
        const teamSlug= req.params.slug;
        const team = await TeamsModel.findOne({slug: teamSlug}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editTeam.notfound
                })
            }
        });
        if (!team) {
            res.status(404).json({
                status: status.notfound,
                message: messages.editTeam.notfound
            })
        }
        res.status(200).json({
            status: status.ok,
            messages: messages.editTeam.success,
            data: {team}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.editTeam.error
        });
    }
};

const viewTeams = async (req, res) => {
    try {
        const teams = await TeamsModel.find();
        if (!teams) {
            res.status(404).json({
                status: status.notfound,
                message: messages.viewTeam.notfound
            })
        }
        res.status(200).json({
            status: status.ok,
            message: messages.viewTeam.success,
            data: {teams}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.viewTeam.error
        });
    }
};

const updateTeams = async (req, res) => {
    try {
        const teamSlug = req.params.slug
        const team = await TeamsModel.findOne({slug: teamSlug}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editTeam.notfound
                })
            }
        });
        if (!team) {
            res.status(404).json({
                status: status.notfound,
                message: messages.updateTeam.notfound
            })
        } else {
            team.team_name = req.body.team_name;
            team.manager = req.body.manager;
            team.website = req.body.website;
            team.founder = req.body.founder;
            team.stadium = req.body.stadium;
            team.save();
        }
        res.status(200).json({
            status: status.ok,
            messages: messages.updateTeam.success,
            data: {team}
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.updateTeam.error
        });
    }
};


const removeTeams = async (req, res) => {
    try {
        const teamSlug = req.params.slug
        const findTeam = await TeamsModel.findOne({slug: teamSlug}, (err, fixture) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editTeam.notfound
                })
            }
        });
        if (!findTeam) {
            res.status(404).json({
                status: status.notfound,
                message: messages.updateTeam.notfound
            })
        }

        const team = await TeamsModel.findOneAndDelete({slug: teamSlug}, (err, team) => {
            if (err) {
                res.status(404).json({
                    status: status.notfound,
                    message: messages.editTeam.notfound
                })
            }
        });
        if (!team) {
            res.status(200).json({
                status: status.ok,
                message: messages.removeTeam.success
            })
        }
    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: status.error,
            message: messages.removeTeam.error
        });
    }
};


module.exports = {
    addTeams,
    editTeams,
    updateTeams,
    removeTeams,
    viewTeams,
};
