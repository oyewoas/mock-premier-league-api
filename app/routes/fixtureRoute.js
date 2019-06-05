const express = require('express');
const router = express.Router();
const FixtureController = require('../controllers/fixtureController');
const AdminAuth = require('../middlewares/adminAuth.js');

//subjects Routes
router.post('/fixture/add', AdminAuth, FixtureController.addFixtures);
router.get('/fixtures', AdminAuth, FixtureController.viewFixtures);
router.get('/fixture/edit/:slug', AdminAuth, FixtureController.editFixtures);
router.put('/fixture/update/:slug', AdminAuth, FixtureController.updateFixtures);
router.delete('/fixture/delete/:slug', AdminAuth, FixtureController.removeFixtures);


module.exports = router;

