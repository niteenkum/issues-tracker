const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project_controller");

//  if route is / then call the project controller
router.get("/", projectController.AddProject);
router.use('/projects', require("./project"))

module.exports = router;