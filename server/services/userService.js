const User = require('../models/user');
const Response = require('../dto/response');

module.exports.addNewUser = async () => {
    const user = new User({
        firstName: 'Long',
        lastName: 'Tran'
    });
    await user.save();

}

module.exports.findAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}

module.exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        let tokens = await user.generateAuthToken();
        let data = { token: tokens, name: (user.lastname + ' ' + user.firstname), username: user.username };
        res.json(new Response(data));
    } catch (e) {
        res.json(new Response(null, "Username or password mismatch", 403));
    }
}

module.exports.signup = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        await user.generateAuthToken();
        res.json(new Response(user));
    } catch (e) {
        res.json(new Response(null, "Error saving user\n" + e.message, 500));
    }
}

module.exports.getUserByUsername = async (req, res) => {
    let param = req.params.id;
    const user = await User.findOne({ 'username': param });
    user.password = "";
    user.tokens = "";
    res.json(new Response(user));
}

module.exports.updateUser = async (req, res) => {
    let data = req.body;
    let user = await User.findOne({ 'username': data.username });

    if (user) {
        try {
            user.email = data.email;
            user.firstname = data.firstname;
            user.lastname = data.lastname;

            user.save();
            res.json(new Response(true));
        } catch (e) {
            res.json(new Response(null, 'Cannot update user', 500));
        }
    } else {
        res.json(new Response(null, 'no username found', 500));
    }
}

module.exports.addTask = async (req, res) => {
    let data = req.body;
    let user = await User.findOne({ 'username': data.username });

    if (user) {


        try {

            user.tasks.push(data.task);

            user.save();
            res.json(new Response(true));
        } catch (e) {
            res.json(new Response(null, 'Cannot update user', 500));
        }
    } else {
        res.json(new Response(null, 'Cannot update Task No user Found', 500));
    }

}

module.exports.removeTaskById = async (req, res) => {
    let data = req.body;
    let user = await User.findOne({ 'username': data.username });


    if (user) {


        try {

            user.tasks.pull(data.taskId);


            user.save();
            res.json(new Response(true));
        } catch (e) {
            res.json(new Response(null, 'Cannot update user', 500));
        }
    } else {
        res.json(new Response(null, 'Cannot remove Task No user Found', 500));
    }

}


module.exports.editTaskById = async (req, res) => {


    try {
        await User.updateOne({ 'username': req.body.username, "tasks._id": req.body.taskId },
            {
                $set: {
                    "tasks.$.description": req.body.description,
                    "tasks.$.name": req.body.name,
                    "tasks.$.priority": req.body.priority,
                    "tasks.$.duedate": req.body.duedate

                }
            }
        );
        res.json(new Response(true));
    } catch (e) {
        res.json(new Response(null, 'Cannot update user', 500));
    }


}



module.exports.findAllTasks = async (req, res) => {
    let data = req.body;
    let user = await User.findOne({ 'username': data.username });
    if (user) {


        try {
            res.json(user.tasks);
        } catch (e) {
            res.json(new Response(null, 'Cannot update user', 500));
        }
    } else {
        res.json(new Response(null, 'Cannot remove Task No user Found', 500));
    }

}
module.exports.findTaskByName = async (req, res) => {
    let data = req.body;

    const user = await User.findOne({ 'username': data.username });
    const result = [];
    if (user) {
        for (let task of user.tasks) {
            if (task.name === data.taskName) {
                result.push(task);
            }
        }
        res.json(result);
    }
    else
        res.json(new Response(null, "User not found", 500));
}


module.exports.findTaskByDueDate = async (req, res) => {
    let data = req.body;
    const user = await User.findOne({ 'username': data.username });
    const result = [];
    if (user) {
        for (let task of user.tasks) {
            let taskDueDate = JSON.stringify(task.duedate)
            taskDueDate = taskDueDate.slice(1, 11)

            if (taskDueDate > data.due) {

                result.push(task);
            }
        }
        res.json(result);
    }
    else
        res.json(new Response(null, "User n   ot found", 500));

}


module.exports.findTaskByPriority = async (req, res) => {
    let data = req.body;

    const user = await User.findOne({ 'username': data.username });
    const result = [];
    if (user) {
        for (let task of user.tasks) {


            if (task.priority === data.priority) {

                result.push(task);
            }
        }
        res.json(result);
    }
    else
        res.json(new Response(null, "User not found", 500));

}