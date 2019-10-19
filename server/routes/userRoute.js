const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/user/:id', userController.getUserByUsername);
router.put('/user', userController.updateUser);
router.get('/users', userController.findAllUsers);

router.patch('/user/addtask', userController.addTask);
router.patch('/user/removetask/id', userController.removeTaskById);
router.patch('/user/edittask/id', userController.editTaskById);
router.get('/useralltasks', userController.findAllTasks);


router.get('/usertask/findbyname', userController.findTaskByName);
router.get('/usertask/findbyduedate', userController.findTaskByDueDate);
router.get('/usertask1/findbypriority', userController.findTaskByPriority);


module.exports = router;



