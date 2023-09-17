
var express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("../logger/logger"),
    companyController = require("../controller/company-controller"),
    {body, validationResult } = require("express-validator"),
    app = express();

// const companies = [{firstName: "fname", lastName: "lname", companyName: "companyname"}]

app.get("/companies", function(req, res){

    const page = req.query.page ? req.query.page : 0;
    const size = req.query.size ? req.query.size : 5;
    companyController.getCompanies(page, size).then(data => res.json(data));
})

app.post("/", function(req, res) {
    companyController.createCompany(req.body).then(data => res.json(data));
});

app.get("/:companyId", function(req, res){
    companyController.getCompanyByID(req.params.companyId).then(data => res.json(data));
});

app.put("/:companyId", function (req, res)  {
    companyController.updateCompany(req.params.companyId, req.body).then(data => res.json(data));
});

app.delete("/:companyId", function(req, res){
    companyController.deleteCompany(req.params.companyId).then(data => res.json(data));
});


module.exports = app
