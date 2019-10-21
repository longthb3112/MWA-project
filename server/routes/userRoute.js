const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/user');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/pics')
    },
    filename: function (req, file, cb) {

        cb(null, 'Picture' + '-' + Date.now() + '.png')
    }
})

const upload = multer({ storage: storage })


router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/user/:id', userController.getUserByUsername);
router.put('/user', userController.updateUser);
router.get('/users', userController.findAllUsers);

router.patch('/user/addtask', userController.addTask);
router.patch('/user/removetask', userController.removeTaskById);
router.patch('/user/edittask', userController.editTaskById);
router.get('/useralltasks', userController.findAllTasks);


router.get('/usertask/findbyname', userController.findTaskByName);
router.get('/usertask/findbyduedate', userController.findTaskByDueDate);
router.get('/usertask1/findbypriority', userController.findTaskByPriority);

router.post('/searchbyname', async (req, res) => {
    const results = await User.find({ username: { $regex: req.body.name } });
    res.json(results)
})

router.patch('/statuschange', async (req, res) => {

    await User.updateOne({ _id: req.body.id }, { $set: { accountStatus: !req.body.status } });
    res.json({})

});

router.patch('/settingchange', async (req, res) => {
    await User.updateOne({ username: req.body.uname }, { $set: { notification: !req.body.notification } });
    res.json({})
})


router.post('/updatepic',

    upload.single('profilepic'),
    function (req, res, next) {
        let file = req.file;
        // if (!file) {
        //     return res.status(400).json({ error: false, message: 'Select Picture', data: {} })
        // }
        /* if (file.mimetype !== 'image/jpeg' || file.size > 3 * 1024 * 1024) {
             return res.status(400).json({ error: false, message: 'Check Extension OR file size (max 3MB)', data: {} })
         }*/

        // res.json({})
        next()

    },
    async function (req, res) {
        let data = req.body;

        let user = await User.findOne({ 'username': data.username });
        if (user) {
            console.log('found\n' + user)
            try {
                user.imageUrl = req.file.filename;
                user.save();
            } catch (e) {

            }
        }

        res.json({})
    }




)


module.exports = router;



