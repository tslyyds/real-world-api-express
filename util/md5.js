// 密码加密
const crypto = require('crypto')

//对密码进行加密，返回加密后的数字 
module.exports = (value) => {
    return crypto.createHash('md5').update('lagou' + value).digest('hex')
}