const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController')

router.get('/admins/seed',  seedController.seedAdmins);
router.get('/users/seed',  seedController.seedUsers);
router.get('/teams/seed',  seedController.seedTeams);
router.get('/fixtures/seed',  seedController.seedFixtures);

module.exports = router;
