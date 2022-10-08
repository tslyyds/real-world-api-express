const express = require('express')
const router = express.Router()
const user = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../model/auth')

// 用户登录
router.post('/users/login', userValidator.login, user.login)

// 用户注册
router.post('/users', userValidator.register, user.register)

// 获取当前登录用户
router.get('/user', auth, user.getUser)

// 更新当前登录用户
router.put('/user', user.updataUser)

module.exports = router