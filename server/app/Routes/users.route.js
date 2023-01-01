const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController');

router.route('/')
.get(userController.list)
.post(userController.create);

router.route('/:userId')
.get(userController.getUserById)
.delete(userController.deleteUserById);


router.route('/:userId/posts')
.get(userController.getPostByUserId)
.post(userController.createPostByUserId)



module.exports = router;
