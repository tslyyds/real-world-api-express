const jwt = require('jsonwebtoken')
const { promisify } = require('util')

//加密的方法 
exports.sign = promisify(jwt.sign)

//解密的方法
exports.verify = promisify(jwt.verify)

//暂时不知道
exports.decode = promisify(jwt.decode)