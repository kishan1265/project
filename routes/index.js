const express = require('express');
const router = express.Router();
router.use(express.static('public'));
var bodyParser = require('body-parser');
// parse various different custom JSON types as JSON
router.use(bodyParser.json({ type: 'application/json' }));
const { ensureAuthenticated } = require('../config/auth');
const useractivityController = require('../controllers/useractivityController');

//welcome page
router.get('/', (req, res) => res.render('welcome'));

// Home Page
router.get('/dashboard', ensureAuthenticated, useractivityController.dashboard);

//Profile page
router.get('/profile', ensureAuthenticated, useractivityController.profile);

//feedback page
router.get('/feedback', ensureAuthenticated, useractivityController.feedback);

//feedback submit
router.post(
  '/feedback',
  ensureAuthenticated,
  useractivityController.feedback_submit
);

//event page
router.get('/event', ensureAuthenticated, useractivityController.event);

//event register
router.post('/event', useractivityController.event_register);

//event deregister
router.post('/event/deregister', useractivityController.event_deregister);

//edit Profile
router.get(
  '/edit_profile',
  ensureAuthenticated,
  useractivityController.edit_profile
);

//edit profile submit
router.post('/edit_profile', useractivityController.edit_profile_submit);

module.exports = router;
