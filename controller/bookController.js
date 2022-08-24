const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");
const axios = require("axios");
const db = require("../model/index");
const Book = db.book;
const resFunc = (res, statusCode, data) => {
  if (Array.isArray(data)) {
    res.status(statusCode).json({
      status: "success",
      results: data.length,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      status: "success",
      data: data,
    });
  }
};
const getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.findAll();
  if (!books) {
    return next(new AppError("No books found", 404));
  }
  resFunc(res, 200, books);
});
const readBook = catchAsync(async (req, res, next) => {
  const { isnb, status } = req.body;

  if (!isnb || !status) {
    return next(new AppError("isnb and status not found", 400));
  }
  const book = await Book.update(
    { isnb, status },
    {
      where: { isnb: isnb },
    }
  );
  const books = await Book.findOne({
    where: {
      isnb,
    },
  });
  const bookss = books.dataValues;

  resFunc(res, 200, bookss);
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
  console.log(data);
  const authorUrl = "https://openlibrary.org" + data.authors[0].key + ".json";
  const authorsReal = await axios.get(authorUrl);
  const authorsname = authorsReal.data.name;

  const title = data.title;
  const author = authorsname;
  const firstPubYear = data.publish_date;
  const pageNum = data.number_of_pages;
  const books = await Book.create({
    title,
    author,
    firstPubYear,
    pageNum,
    isnb,
  });
  resFunc(res, 200, books);
});

module.exports = {
  addBook,
  readBook,
  getAllBooks,
};
