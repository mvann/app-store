const router = require('express').Router();
const ctrl = require('./packageController');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: require('../db').uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
})
const upload = multer({ storage: storage });

router.get('/', ctrl.getAllPackages);
router.post('/upload', upload.single('file'), ctrl.handleUpload);
router.post('/approve', ctrl.approve);
router.post('/reject', ctrl.reject);
router.post('/reset', ctrl.reset);
router.get('/:filename', ctrl.getFile);

module.exports = router;
