const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/user/:id', userController.getUserByUsername);
router.put('/user', userController.updateUser);
router.get('/users', userController.findAllUsers);
router.get('/usertask/findbyname', userController.findTaskByName);
router.get('/usertask/findbyduedate', userController.findTaskByDueDate);
router.get('/usertask1/findbypriority', userController.findTaskByPriority);

module.exports = router;



