const asyncHandler = require("../utils/async_handler");

const Exception = require('../utils/exception');

exports.login = asyncHandler(async (req, res, next) => {
  res.status(200).json({})

  next();
});

exports.signUp = asyncHandler(async (req, res, next) => {
  res.status(201).json({})

  next();
});


exports.forgotPassword = asyncHandler(async (req, res, next) => {
  res.status(201).json({})

  next();
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  res.status(201).json({})

  next();
});
