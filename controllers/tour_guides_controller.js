const asyncHandler = require('../utils/async_handler');

const {PrismaClient} = require('@prisma/client');

const Exception = require('utils/exception');

const prisma = new PrismaClient();

exports.getTourGuides = asyncHandler(async (req, res, next) => {

  const tourGuides = await prisma.user.findMany({
    where: {role: 'tour-guide'}
  });


  res.status(200).json({
    success: true,
    body: tourGuides,
  });

  next();
});
