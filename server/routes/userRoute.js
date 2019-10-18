const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/user/:id', userController.getUserByUsername);
router.put('/user', userController.updateUser);
router.get('/users', userController.findAllUsers);
module.exports = router;



