const router = require('express').Router();
const multer = require('multer');

const filesController = require('../controllers/files_controller');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = req.body.path ? `uploads/${req.body.path}` : 'uploads/';

    const directory = 'uploads';

    if (!fs.existsSync(directory)) fs.mkdirSync(directory);

    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
    const fileName = `File-${new Date().getTime()}.${ext}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage, fields: [{ name: 'path', maxLimit: 100 }] });

router.route('/').post(upload.array('files', 5), filesController.uploadFiles);

module.exports = router;
