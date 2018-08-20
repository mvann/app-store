const router = require('express').Router();
const ctrl = require('./userController');

router.get('/', ctrl.getAllUsers);
router.post('/', ctrl.createUser);
router.get('/:username', ctrl.getUser);
router.post('/:username/login', ctrl.userLogin);

module.exports = router;
