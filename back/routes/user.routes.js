const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');

// Auth
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);

// CRUD User
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
