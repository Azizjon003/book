const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const axios = require("axios");
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

const addBook = catchAsync(async (req, res, next) => {
  const isnb = req.params.isnb;
  const urlBase = "https://openlibrary.org/books/";
  if (!isnb) {
    return next(new AppError("isnb not found", 404));
  }
  const url = urlBase + isnb + ".json";
  let data = await axios.get(url);
  if (!data) {
    return next(new AppError("data not found", 400));
  }
  data = data.data;
  // console.log(data);
  const title = data.title;
  const author = data.publishers;
  const firstPubYear = data.publish_date;
  const pageNum = data.number_of_pages;
  const books = await Book.create({
    title,
    author,
    firstPubYear,
    pageNum,
    isnb,
  });

  res.status(200).json({
    status: "succes",
    data: books,
  });
});
module.exports = {
  addBook,
};
