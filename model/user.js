const mongoose = require('mongoose')
const base = require('./base-model')
const md5 = require('../util/md5')

const userSchema = new mongoose.Schema({
    ...base,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: vaule => md5(vaule),
        select: false
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})

module.exports = userSchema