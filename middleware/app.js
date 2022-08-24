const express = require("express");
const app = express();
const errorHandler = require("../controller/errorHandler");
const router = require("../routes/bookRoute");
app.use(express.static(`${__dirname}../public`));
app.use("/api", router);
app.use(errorHandler);
module.exports = app;
