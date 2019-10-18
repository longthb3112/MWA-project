const User = require('../models/user')
const jwt = require('jsonwebtoken')

const applicationConstant = require('../constants/application-constant');
const Response = require('../dto/response');

const auth = async (req, res, next) => {

    if (req.url.indexOf('login') < 0 && req.url.indexOf('signup') < 0) {

        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, applicationConstant.JWT_TOKEN_KEY);
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })









            if (!user) {
                res.json(new Response(null, 'Unauthenticated User', 403))
            } else {
                req.token = token
                req.user = user
                next()
            }

        } catch (e) {
            res.json(new Response(null, 'Unauthenticated User', 403))
        }

    } else {
        next();
    }
}

module.exports = auth