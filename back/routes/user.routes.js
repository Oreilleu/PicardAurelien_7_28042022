const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const uploadCtrl = require('../controllers/upload.controller');
const multer = require('../middleware/multer-config');
// const multer = require('multer');
// const upload = multer();

// Auth
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout', authCtrl.logout);

// CRUD User
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

// Upload
// router.post('/upload', uploadCtrl.uploadProfil);

module.exports = router;
