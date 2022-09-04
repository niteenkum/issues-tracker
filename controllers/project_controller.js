const Project = require("../models/project");
const Issue = require("../models/issue");


// render the sign up page
module.exports.AddProject = function (req, res) {
  Project.find({}, function (err, projects) {
    if (err) {
      console.log("Error in finding the user in sign up");
      return;
    }
    return res.render("project_add", {
      title: "Project | Sign Up",
      projects: projects,
    });
  });
};

// render the sign in page
module.exports.issue = function (req, res) {
  console.log(req.params.id);

  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return;
    }
    Issue.find({ project_id: req.params.id }, function (err, issues) {
      if (err) {
        return;
      }
      return res.render("project_issue", {
        title: "Project | Sign In",
        project: project,
        issues: issues,
      });
    });
  });
};

// creating the new project

module.exports.create = function (req, res) {
  Project.create(req.body, function (err, user) {
    if (err) {
      return;
    }
    return res.redirect("back");
  });
};

//Adding a new issue only if the project exists in the database.
module.exports.addIssue = async function (req, res) {
  console.log("Error in issue", req.body);
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return;
    }
    Issue.create(req.body, function (err, issue) {
      if (err) {
        console.log("Error in creating the issue", err);
        return;
      }
    return res.redirect("back");
    });
  });
};

// Searching for the issue in the database

module.exports.searchIssue = function (req, res) {
  console.log(req.params, "Request body", req.query);

  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return;
    }
    Issue.find({ project_id: req.params.id }, function (err, issues) {
      if (err) {
        return;
      }

      let filteredIssues = issues?.filter((issue) => {
        return (
          issue.title.toLowerCase().includes(req.query.search.toLowerCase()) ||
          issue.description
            .toLowerCase()
            .includes(req.query.search.toLowerCase())
        );
      });

      return res.render("project_issue", {
        title: "Project | Sign In",
        project: project,
        issues: filteredIssues,
      });
    });
  });
};

// Filtering Data Using Labels

module.exports.filterIssue = function (req, res) {

  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return;
    }
    Issue.find({ project_id: req.params.id }, function (err, issues) {
      if (err) {
        return;
      }
      

      let filteredIssues;
      if(Array.isArray(req.query.labels)){
        req.query.labels?.filter((filter) => {
          filteredIssues = issues?.filter((issue) => {
            console.log("issue lables",issue.labels, "ssule label length", issue.labels.includes(filter));
           return issue.labels.includes(filter);
         });
       })
      }
      else{
        filteredIssues = issues?.filter((issue) => {
          console.log("issue lables",issue.labels, "ssule label length", issue.labels.includes(req.query.labels));
          return issue.labels.includes(req.query.labels);
        });
      }

      return res.render("project_issue", {
        title: "Project | Sign In",
        project: project,
        issues: filteredIssues,
      });
    });
  });
};
