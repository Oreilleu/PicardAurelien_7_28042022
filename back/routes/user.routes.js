const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const userCtrl = require('../controllers/user.controller');
const multerProfil = require('../middleware/multerProfil-config');

// Auth
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout', authCtrl.logout);

//multer sur put 
// CRUD User
router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multerProfil, userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
