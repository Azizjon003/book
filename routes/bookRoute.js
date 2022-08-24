const Router = require("express").Router();
const bookController = require("../controller/bookController");
Router.get("/add/:isnb", bookController.addBook);

module.exports = Router;
