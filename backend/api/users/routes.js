const router = require('express').Router()
const ctrl = require('./controller')

// router.get('/', ctrl.getAllUsers)
router.get('/', ctrl.getAllUsers)
router.post('/', ctrl.createUser)
router.get('/:username', ctrl.getUser)

module.exports = router;
