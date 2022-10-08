//验证用户的token
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')
module.exports = async(req, res, next) => {
    //拿到请求头里的经过加密的token
    let token = req.headers['authorization']
    token = token ? token.split('Bearer ')[1] : null
    if (!token) {
        return res.status(401).end()
    }
    try {
        //解密
        const decodeToken = await jwt.verify(token, jwtSecret)
        req.user = await User.findById(decodeToken.userId)
        console.log(decodeToken)
        next()
    } catch (error) {
        return res.status(401).end()
    }
}