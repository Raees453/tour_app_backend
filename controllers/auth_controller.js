const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const asyncHandler = require('../utils/async_handler');
const { PrismaClient } = require('@prisma/client');

const Exception = require('../utils/exception');
const util = require('util');

const prisma = new PrismaClient();

// first, last, phone, email, role, password
exports.login = asyncHandler(async (req, res, next) => {

  const { email, password, role } = req.body;

  const user = await prisma.user.findFirst({
    where: { email: email, role: role },
  });

  if (!user) return next(new Exception('User does not exist', 404));

  const isPasswordSame = await bcrypt.compare(password, user.password);

  if (!isPasswordSame) return next(new Exception('Password does not match', 401));

  user.token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  user.otp = undefined;
  user.otpExpireAt = undefined;
  user.password = undefined;
  user.passwordChangedAt = undefined;

  res.status(200).json({
    status: true, body: user,
  });

  next();
});

exports.signUp = asyncHandler(async (req, res, next) => {

  let { email, password, role, firstName, lastName, phone } = req.body;

  if (!email || !password || !role || !firstName || !lastName || !phone || !role) {
    return next(new Exception('Please provide email, password, role, firstName, lastName & phone', 400));
  }

  password = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password, role, firstName, lastName, phone },
  });

  if (role === 'tour-guide') {
    await prisma.tourGuide.create({
      data: {userId: user.id , id: user.id }
    });
  }

  user.otp = undefined;
  user.otpExpireAt = undefined;
  user.password = undefined;
  user.passwordChangedAt = undefined;

  user.token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.status(201).json({
    status: true, message: 'Account Created Successfully', body: user,
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


exports.changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const { user } = req;

  if (newPassword !== confirmNewPassword) {
    return next(new Exception('New Password & Confirm New Password do not match', 400));
  }

  const isPasswordSame = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordSame) return next(new Exception('Password does not match', 401));

  const password = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password },
  });

  res.status(200).json({
    status: true,
    message: 'Password Updated Successfully',
  });

  next();
});


exports.authorise = asyncHandler(async (req, res, next) => {

  let token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return next(new Exception('Please login to access', 403));
  }

  token = token.replace('Bearer ', '');

  console.log('Token', token);
  const result = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: { id: result.id },
  });

  if (!user) return next(new Exception('No User Exists', 400));

  req.user = user;

  next();

});
