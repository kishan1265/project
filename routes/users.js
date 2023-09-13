const express = require('express');
const router = express.Router();
router.use(express.static('public'));
const userController = require('../controllers/userController');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Forgot password page
router.get('/forgot', (req, res) => res.render('forgot'));

// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

//logout
router.get('/logout', userController.logout);

//forgot password

router.post('/forgot', userController.forgot);

//reset password page
router.get(`/reset/:id/:token`, userController.reset_page);

//reset password submit
router.post(`/reset/:id/:token`, userController.reset_submit);

module.exports = router;
