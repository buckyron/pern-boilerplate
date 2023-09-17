const logger = require("./logger/logger");
require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    Logger     = require("./logger/logger"),
    app = express(),
    port = process.env.PORT;



app.use(bodyParser.json());
app.use("/api", require("./routes/routes"));
app.use('/map', express.static(__dirname + '/file-system/company/maps'));

app.get("/", function(req, res){
    res.send("App works!!!");
});

app.get("*", function(req, res){
    logger.info("Unknown route");
    res.send("Hello all!!!");
});

app.listen(port, function(err){
    logger.info("running server on from port::::::" + port);
});