const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const multer = require('../middleware/multer-config');

// Auth
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout', authCtrl.logout);

// CRUD User
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer, userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
