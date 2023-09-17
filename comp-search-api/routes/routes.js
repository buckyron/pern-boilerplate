const express = require("express"),
    apiRouter = express();

apiRouter.use("/company", require("./company-routes"));
apiRouter.use("/user", require("./user-routes"));


module.exports = apiRouter;