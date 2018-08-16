const router = require('express').Router()
const ctrl = require('./authController');

router.post('/login', ctrl.handleLogin);

module.exports = router;
