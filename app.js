require("dotenv").config();
const cors = require("cors");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);

const mongoose = require('mongoose');
const { AppError, sendResponse } = require("./helpers/utils");
/* DB connection */
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI).then(()=>console.log(`DB connected ${mongoURI}`)).catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use((req,res,next)=>{
  const err = new AppError(404, "Not Found", "Bad Request");
  next(err);
});

/*Initialize Error handling*/
app.use((err, req, res, next)=>{
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode: 500,
    false,
    null,
    {message: err.message},
    err.isOperational ? err.errorType: "Internal Server Error");
});

module.exports = app;