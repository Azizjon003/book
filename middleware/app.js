const express = require("express");
const app = express();
const errorHandler = require("../controller/errorHandler");
app.use(express.static(`${__dirname}../public`));
app.use(errorHandler);
module.exports = app;
