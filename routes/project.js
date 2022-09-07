const express = require('express');
const router = express.Router();
const projectController = require("../controllers/project_controller");


// GET request for creating a Project. NOTE This must come before routes that display Project (uses id).
router.get('/AddProject', projectController.AddProject);
router.get('/issue/:id', projectController.issue);
router.post('/create', projectController.create);
router.post('/create-issue/:id', projectController.addIssue);
router.get('/search/:id', projectController.searchIssue);
router.get('/filter/:id', projectController.filterIssue);




module.exports = router;