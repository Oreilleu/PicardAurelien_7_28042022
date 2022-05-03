const router = require('express').Router();
const postCtrl = require('../controllers/post.controller')


router.post('/', postCtrl.createPost)
router.get('/', postCtrl.getAllPost)
router.get('/:id', postCtrl.getOnePost)
router.put('/:id', postCtrl.updatePost)
router.delete('/:id', postCtrl.deletePost)

module.exports = router;
