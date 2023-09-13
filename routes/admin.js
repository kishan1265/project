const express = require('express');
const router = express.Router();
router.use(express.static('public'));
var bodyParser = require('body-parser');
// parse various different custom JSON types as JSON
router.use(bodyParser.json({ type: 'application/json' }));
const { ensureAuthenticated, isAdmin } = require('../config/auth');

const adminController = require('../controllers/adminController');

router.get('/', (req, res) => res.render('admin'));

//admin Login
router.post('/', adminController.login);

//user page
router.get('/user', isAdmin, adminController.user);

//admin list
router.get('/admin_dashboard', isAdmin, adminController.admin_list);

//admin dashboard (home page)
router.get('/dashboard', isAdmin, adminController.dashboard);

//add event page
router.get('/event', isAdmin, adminController.add_event);

//edit event page
router.get('/edit_event/:id', adminController.edit_event);

//edit event submit
router.post('/edit_event/:id', adminController.edit_event_submit);

//event dashboard page
router.get('/event_dashboard', isAdmin, adminController.event_dashboard);

//feedback dashboard page
router.get('/feedback', isAdmin, adminController.feedback_dashboard);

//feedback solve submit
router.post('/feedback', adminController.feedback_solve);

//participate page
router.get('/participate/:id', adminController.participate_page);

//event delete
router.post('/delete_event', adminController.event_delete);

//add admin page
router.get('/add_admin', isAdmin, adminController.add_admin);

//delete admin page
router.get('/delete_admin', isAdmin, adminController.delete_admin);

//admin logout
router.get('/logout', adminController.logout);

// Add Admin submit
router.post('/add_admin', adminController.add_admin_submit);

router.post('/delete_admin', adminController.delete_admin_submit);

router.post('/delete_user', adminController.delete_user_submit);

// Add Event submit
router.post('/event', adminController.add_event_submit);

module.exports = router;
