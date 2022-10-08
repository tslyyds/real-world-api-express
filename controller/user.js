const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
    //用户登录
exports.login = async(req, res, next) => {
    try {
        const user = req.user.toJSON()

        //根据user.id生成token
        const token = await jwt.sign({ userId: user._id }, jwtSecret)

        //删除密码数据，以便客户端不显示密码
        delete user.password
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}

//用户注册
exports.register = async(req, res, next) => {
    try {
        console.log(req.body)
        let user = new User(req.body.user)
        await user.save()

        user = user.toJSON()
        delete user.password
        res.status(201).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

// 获取当前登录用户
exports.getUser = async(req, res, next) => {
    try {
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}

// 更新当前登录用户
exports.updataUser = async(req, res, next) => {
    try {
        res.send('put /user')
    } catch (error) {
        next(error)
    }
}