
var express = require("express"),
bodyParser = require("body-parser"),
logger = require("../logger/logger"),
userController = require("../controller/user-controller"),
app = express();

// const users = [{firstName: "fname", lastName: "lname", userName: "username"}]

app.get("/users", function(req, res){
    userController.getUsers().then(data => res.json(data));
})

app.get("/company/:companyId", function(req, res){
    const page = req.query.page ? req.query.page : 0;
    const size = req.query.size ? req.query.size : 5;
    userController.getUsersByCompany(req.params.companyId, page, size).then(data => res.json(data));
});

app.post("/", function(req, res){
    userController.createUser(req.body).then(data => res.json(data));
});


app.get("/:userId", function(req, res){
    userController.getUserByID(req.params.userId).then(data => res.json(data));
});

app.put("/:userId", function(req, res){
    userController.updateUser(req.params.userId, req.body).then(data => res.json(data));
});

app.put("/:userId/company/remove", function(req, res){
    userController.removeFromCompany(req.params.userId).then(data => res.json(data));
})

app.put("/:userId/company/:companyId", function(req, res){
    userController.addToCompany(req.params.userId, req.params.companyId).then(data => res.json(data));
});

app.put("/:userId/deactivate", function(req, res){
    userController.deactivateUser(req.params.userId).then(data => res.json(data));
});

app.put("/:userId/activate", function(req, res){
    userController.activateUser(req.params.userId).then(data => res.json(data));
});


app.delete("/:userId", function(req, res){
    userController.deleteUser(req.params.userId).then(data => res.json(data));
});


module.exports = app
