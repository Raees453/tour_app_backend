const path = require('path');
const multer = require('multer');

const asyncHandler = require('../utils/async_handler');

const { PrismaClient } = require('@prisma/client');

const Exception = require('../utils/exception');

const prisma = new PrismaClient();


exports.getTourGuides = asyncHandler(async (req, res, next) => {

  const tourGuides = await prisma.user.findMany({
    where: { role: 'tour-guide' }, select: {
      id: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    success: true,
    body: tourGuides,
  });

  next();
});

exports.updateTourGuide = asyncHandler(async (req, res, next) => {

  let { user, files } = req;
  const { bio, description } = req.body;

  let tourGuide = await prisma.tourGuide.findFirst({ where: { userId: user.id } });

  if (!tourGuide) return next(new Exception('No Tour Guide Found', 404));

  const uploadedFiles = [];

  for (const file of files) {
    const ext = path.extname(file.originalname); // Extract extension
    const fileName = `File-${file.originalname.slice(0, -ext.length)}${ext}`;
    const filePath = path.join(`${__dirname}/${file.destination}`, fileName);

    uploadedFiles.push(filePath);
  }

  await prisma.tourGuide.update({
    where: { id: tourGuide.id }, data: { bio, description, images: JSON.stringify(uploadedFiles) },
  });

  user = await prisma.user.findUnique({
    where: { id: user.id }, include: {
      TourGuide: true,
    },
  });

  user.portfolio = user.TourGuide[0];
  user.TourGuide = undefined;

  res.status(200).json({
    status: true,
    data: user,
  });

  next();
});
