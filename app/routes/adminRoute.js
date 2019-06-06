const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

//subjects Routes
router.post('/admin/signin', AdminController.signInAdmin);
router.post('/admin/signup', AdminController.signUpAdmin);

module.exports = router;

