const router = require('express').Router();
const ctrl = require('./userController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.get('/', ctrl.getAllUsers)
router.get('/', ctrl.getAllUsers);
router.post('/', ctrl.createUser);
router.post('/upload', upload.single('file'), (req, res, next) => {
  console.log(req);
});
router.get('/:username', ctrl.getUser);
router.post('/:username/login', ctrl.userLogin);

module.exports = router;
