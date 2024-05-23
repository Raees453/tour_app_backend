const fileSystem = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = 'uploads/tour_guides/';
    if (!fileSystem.existsSync(dir)) {
      fileSystem.mkdirSync(dir, { recursive: true });
    }

    let filePath = path.join(__dirname, '..');

    filePath = `${filePath}/uploads/tour_guides`;

    cb(null, dir);
    cb(null, filePath);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname); // Extract extension
    const fileName = `File-${file.originalname.slice(0, -ext.length)}${ext}`;

    cb(null, fileName);
  },
});

module.exports = storage;
