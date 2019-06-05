const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/teamController');
const AdminAuth = require('../middlewares/adminAuth.js');

//subjects Routes
router.post('/team/add', AdminAuth, TeamController.addTeams);
router.get('/teams', AdminAuth, TeamController.viewTeams);
router.get('/team/edit/:slug', AdminAuth, TeamController.editTeams);
router.put('/team/update/:slug', AdminAuth, TeamController.updateTeams);
router.delete('/team/delete/:slug', AdminAuth, TeamController.removeTeams);


module.exports = router;

