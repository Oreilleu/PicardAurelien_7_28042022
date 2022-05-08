const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const { checkUser } = require('../middleware/auth.middleware');
const multer = require('../middleware/multer-config');

// Auth
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);

// CRUD User
router.get('/', checkUser, userCtrl.getAllUser);
router.get('/:id', checkUser, userCtrl.getOneUser);
router.put('/:id', checkUser, multer, userCtrl.updateUser);
router.delete('/:id', checkUser, userCtrl.deleteUser);

module.exports = router;
