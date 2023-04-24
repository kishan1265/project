const express = require('express');
const router = express.Router();
const recourseController = require('../controllers/resourceController');
// const is_admin=require('../config/auth.js').isAdmin;
const ensureAuthenticated=require('../config/auth.js').ensureAuthenticated;


// router.get("/:id",recourseController.Resource_get);
router.get("/",ensureAuthenticated,recourseController.Resource_get_all);
// router.get("/:id",ensureAuthenticated,recourseController.Resource_get_one);
// router.put("/",recourseController.Resource_get_all);
// router.get("/compose",is_admin,recourseController.compose_get);
// router.post("/compose",is_admin,recourseController.compose_post);
// router.put("/:id",recourseController.Resource_put);
// router.delete("/",recourseController.Resource_delete);
module.exports = router;