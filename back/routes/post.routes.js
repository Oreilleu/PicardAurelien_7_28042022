const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');
// const multer = require('../middleware/multer-config');

// CRUD post
router.post('/', postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

// Likes
router.get('/like/:id', postCtrl.getLike);
router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/unlike-post/:id', postCtrl.unlikePost);

module.exports = router;
