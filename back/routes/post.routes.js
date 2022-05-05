const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');

// CRUD post
router.post('/', postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

// Likes
router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/unlike-post/:id', postCtrl.unlikePost);

// Comments
router.post('/comment-post/:id', postCtrl.commentPost)
router.patch('/update-comment-post/:id', postCtrl.updateCommentPost)
router.patch('/delete-comment-post/:id', postCtrl.deleteCommentPost)

module.exports = router;
