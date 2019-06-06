const express = require('express');
const router = express.Router();
const FixtureController = require('../controllers/fixtureController');
const AdminAuth = require('../middlewares/adminAuth');
const UserAuth = require('../middlewares/userAuth');
const redisMiddleWare = require('../middlewares/webCache')


//Admin Fixture Routes
router.post('/fixture/add', AdminAuth, FixtureController.addFixtures);
router.get('/fixtures', AdminAuth, redisMiddleWare.redisWebCache, FixtureController.viewFixtures);
router.get('/fixture/edit/:slug', AdminAuth, redisMiddleWare.redisWebCache, FixtureController.editFixtures);
router.put('/fixture/update/:slug', AdminAuth, FixtureController.updateFixtures);
router.delete('/fixture/delete/:slug', AdminAuth, FixtureController.removeFixtures);

// User Fixture Routes
router.get('/pending/fixtures', UserAuth, redisMiddleWare.redisWebCache, FixtureController.pendingFixtures);
router.get('/completed/fixtures', UserAuth, redisMiddleWare.redisWebCache, FixtureController.completedFixtures);
router.get('/search/fixtures', UserAuth, redisMiddleWare.redisWebCache, FixtureController.searchFixtures);

module.exports = router;

