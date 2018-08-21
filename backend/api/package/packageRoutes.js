const router = require('express').Router();
const ctrl = require('./packageController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', ctrl.getAllPackages);
router.post('/upload', upload.single('file'), ctrl.handleUpload);
router.post('/approve', ctrl.approve);
router.post('/reject', ctrl.reject);
router.post('/reset', ctrl.reset);

module.exports = router;
