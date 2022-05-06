const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');
const { checkUser } = require('../middleware/auth.middleware')

// CRUD post
router.post('/', checkUser, postCtrl.createPost);
router.get('/', checkUser, postCtrl.getAllPost);
router.get('/:id', checkUser, postCtrl.getOnePost);
router.put('/:id', checkUser, postCtrl.updatePost);
router.delete('/:id', checkUser, postCtrl.deletePost);

// Likes
router.patch('/like-post/:id', checkUser, postCtrl.likePost);
router.patch('/unlike-post/:id', checkUser, postCtrl.unlikePost);

// Comments
router.post('/comment-post/:id', checkUser, postCtrl.commentPost)
router.patch('/update-comment-post/:id', checkUser, postCtrl.updateCommentPost)
router.patch('/delete-comment-post/:id', checkUser, postCtrl.deleteCommentPost)

module.exports = router;
