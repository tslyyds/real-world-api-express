// 用户验证相关
const validations = require('../middleware/validate')
const { User } = require('../model')
const { body } = require('express-validator')
const md5 = require('../util/md5')

//用户注册验证
exports.register = validations([
    body('user.username')
    .notEmpty().withMessage('用户名不能为空！')
    .custom(async username => {
        //通过用户传来的username判断用户名是否在数据库中存在
        const user = await User.findOne({ username })
        if (user) {
            return Promise.reject('用户名已存在！')
        }
    }),

    body('user.password').notEmpty().withMessage('密码不能为空！'),
    body('user.email')
    .notEmpty().withMessage('邮箱不能为空！')
    .isEmail().withMessage('邮箱格式不正确！')
    //意为前面验证通过后才能进行下面验证
    .bail()
    .custom(async email => {
        //通过用户传入的email判断邮箱是否存在
        const user = await User.findOne({ email })
        if (user) {
            return Promise.reject('邮箱已存在！')
        }
    })
])

//用户登录验证
exports.login = [
    validations([
        body('user.email').notEmpty().withMessage('邮箱不能为空！'),
        body('user.password').notEmpty().withMessage('密码不能为空！')
    ]),
    validations([
        body('user.email').custom(async(email, { req }) => {
            //如果成功后，返会的数据包括数组内的属性
            const user = await User.findOne({ email }).select(['email', 'username', 'bio', 'image', 'password'])
            if (!user) {
                return Promise.reject("用户不存在！")
            }
            //如果存在该用户，则将该用户保存在请求体中，以便下面使用
            req.user = user
        })
    ]),
    validations([
        body('user.password').custom(async(password, { req }) => {
            console.log(req.user)
            if (md5(password) !== req.user.password) {
                return Promise.reject('密码错误！')
            }
        })
    ])
]