const userService = require('../services/userService');

module.exports.login = async (req, res) => {
    await userService.login(req, res);
}
module.exports.signup = async (req, res) => {
    await userService.signup(req, res);
}

module.exports.findAllUsers = async (req, res) => {
    await userService.findAllUsers(req, res);
}

module.exports.getUserByUsername = async (req, res) => {
    await userService.getUserByUsername(req, res);
}

module.exports.updateUser = async (req, res) => {
    await userService.updateUser(req, res);
}

module.exports.addTask = async (req, res) => {
    await userService.addTask(req, res);
}

module.exports.removeTaskById = async (req, res) => {
    await userService.removeTaskById(req, res);
}
module.exports.editTaskById = async (req, res) => {
    await userService.editTaskById(req, res);
}
module.exports.findAllTasks = async (req, res) => {
    await userService.findAllTasks(req, res);
}

module.exports.findTaskByName = async (req, res) => {
     await userService.findTaskByName(req, res);
}


module.exports.findTaskByDueDate = async (req, res) => {
    await userService.findTaskByDueDate(req, res);
}
module.exports.findTaskByPriority = async (req, res) => {
    await userService.findTaskByPriority(req, res);
}