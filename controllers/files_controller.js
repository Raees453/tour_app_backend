const path = require('path');

const asyncHandler = require('../utils/async_handler');

exports.uploadFiles = asyncHandler(async (req, res, next) => {

  const paths = [];

  for (const file of req.files) {

    console.log(file.path);
    const filePath = path.join(__dirname, file.path);

    paths.push(filePath);
  }

  res.status(200).json({
    status: true,
    body: paths,
  });
});
