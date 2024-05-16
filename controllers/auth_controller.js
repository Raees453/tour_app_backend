
const bcrypt = require('bcrypt');

const asyncHandler = require('../utils/async_handler');
const { PrismaClient } = require('@prisma/client');

const Exception = require('../utils/exception');

const prisma = new PrismaClient();

exports.login = asyncHandler(async (req, res, next) => {
  res.status(200).json({});

  next();
});

exports.signUp = asyncHandler(async (req, res, next) => {

  let { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new Exception('Please provide email, password, confirmPassword and role.', 400));
  }

  if (password !== confirmPassword) {
    return next(new Exception('Password and Confirm Password do not match', 400));
  }

  password = bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password, role },
  });

  user.otp = undefined;
  user.otpExpireAt = undefined;
  // user.password = undefined;
  // user.passwordChangedAt = undefined;

  res.status(201).json({
    status: true,
    message: 'Account Created Successfully',
    body: user,
  });

  next();
});


exports.forgotPassword = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) return next(new Exception('Please provide email & password', 400));


  res.status(201).json({});

  next();
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  res.status(201).json({});

  next();
});
