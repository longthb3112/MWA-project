const userService = require('../services/userService');

module.exports.login = async(req, res) => {
    await userService.login(req, res);
}
module.exports.signup = async(req, res) => {
    await userService.signup(req, res);
}

module.exports.findAllUsers = async (req, res) => {
    await userService.findAllUsers(req, res);
}

module.exports.getUserByUsername = async (req, res) => {
    await userService.getUserByUsername(req, res);
}

module.exports.updateUser = async(req, res) => {
    await userService.updateUser(req, res);
}

