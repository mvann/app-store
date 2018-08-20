const router = require('express').Router();
const ctrl = require('./packageController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', ctrl.getAllPackages);
router.post('/upload', upload.single('file'), ctrl.handleUpload);

module.exports = router;
