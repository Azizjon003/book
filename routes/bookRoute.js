const Router = require("express").Router();
const bookController = require("../controller/bookController");
Router.get("/add/:isnb", bookController.addBook);
Router.post("/read", bookController.readBook);
Router.get("/books", bookController.getAllBooks);
module.exports = Router;
