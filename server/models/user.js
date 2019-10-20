const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const applicationConstant = require('../constants/application-constant');
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        sparse: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    priority: {
        type: Number,
        default: 1
    },
    startdate:{
        type:Date,
        required: true
    },
    duedate: {
        type: Date,
        required:true
    },
    status: {
        type: Number,
        default: 0
    },
    percentage:{
        type:Number,
        default:0
    }

});
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    imageUrl: {
        type: String,
        default: 'Avatar.jpg',
        trim: true
    },
    description: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    tasks: [taskSchema],
    roles: []
});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, applicationConstant.JWT_TOKEN_KEY)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (uname, upassword) => {
    const user = await User.findOne({ username: uname })

    if (!user) {
        throw new Error('Unable to login')
    }
    //TODO: unrem later
    const isMatch = await bcrypt.compare(upassword, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;