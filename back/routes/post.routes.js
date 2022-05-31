const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');
const multer = require('../middleware/multer-config');
// const multer = require('multer');
// const upload = multer();

// CRUD post
// router.post('/upload', upload.single('file'), postCtrl.createPost);
router.post('/', multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

// Likes
router.get('/like/:id', postCtrl.getLike);
router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/unlike-post/:id', postCtrl.unlikePost);

module.exports = router;
