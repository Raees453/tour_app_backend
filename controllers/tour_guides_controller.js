const path = require('path');
const multer = require('multer');

const asyncHandler = require('../utils/async_handler');

const { PrismaClient } = require('@prisma/client');

const Exception = require('../utils/exception');

const prisma = new PrismaClient();


exports.getTourGuides = asyncHandler(async (req, res, next) => {

  let tourGuides = await prisma.user.findMany({
    where: { role: process.env.TOUR_GUIDE },
    include: {TourGuide: true}
  });

  tourGuides.forEach((e) => {
    e.password = undefined;
    e.passwordChangedAt = undefined;
  });

  res.status(200).json({
    success: true,
    body: tourGuides,
  });

  next();
});

exports.getTourGuideById = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  if (!id) return next(new Exception('Please provide id', 400));

  const tourGuide = await prisma.user.findUnique({
    where: { id },
    include: { TourGuide: true },
  });

  tourGuide.password = undefined;
  tourGuide.passwordChangedAt = undefined;
  tourGuide.otp = undefined;
  tourGuide.otpExpireAt = undefined;

  res.status(200).json({
    status: true,
    data: tourGuide,
  });

  next();
});

exports.updateTourGuide = asyncHandler(async (req, res, next) => {

  let { user } = req;
  const { bio, description, portfolio, firstName, lastName, city, profile } = req.body;

  let tourGuide = await prisma.tourGuide.findFirst({ where: { userId: user.id } });

  if (!tourGuide) return next(new Exception('No Tour Guide Found', 404));

  await prisma.tourGuide.update({
    where: { id: user.id }, data: { images: [], city },
  });

  await prisma.user.update({
    where: { id: user.id }, data: { bio, description, firstName, lastName, profile },
  });


  user = await prisma.user.findUnique({
    where: { id: user.id }, include: {
      TourGuide: true,
    },
  });

  user.password = undefined;
  user.passwordChangedAt = undefined;
  user.otp = undefined;
  user.otpExpireAt = undefined;

  res.status(200).json({
    status: true,
    data: user,
  });

  next();
});
