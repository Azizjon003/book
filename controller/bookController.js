const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const db = require("../model/index");
const Book = db.book;

const getBooks = catchAsync(async (req, res, next) => {
  const books = await Book.findAll();
  if (!books) {
    return next(new AppError("No books found", 404));
  }
  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
});
const getOneBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    return next(new AppError("No book found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
});
