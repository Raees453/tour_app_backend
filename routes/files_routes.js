const router = require('express').Router();
const multer = require('multer');

const filesController = require('../controllers/files_controller');
const fileSystem = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = req.body.path ? `uploads/${req.body.path}` : 'uploads/';

    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `File-${new Date().getTime()}${ext}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage , fields: [{ name: 'path', maxLimit: 100 }]});

router.route('/').post(upload.array('files', 5), filesController.uploadFiles);

module.exports = router;
