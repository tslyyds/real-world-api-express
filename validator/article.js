const { body, params } = require('express-validator')
const validate = require('../middleware/validate')
const { Acticle, Article } = require('../model')

exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('标题不能为空！'),
    body('article.description').notEmpty().withMessage('介绍不能为空！'),
    body('article.body').notEmpty().withMessage('内容不能为空！'),
])

//判断是否符合id格式
exports.getArticle = validate([
    validate.isValidObjectId(['params'], 'articleID')
])

//判断是否符合操作条件
exports.updateArticle = [validate([
        validate.isValidObjectId(['params'], 'articleID')
    ]),

    //通过文章id验证是否有该文章
    async(req, res, next) => {
        const articleID = await req.params.articleID
        const article = await Article.findById(articleID)
        req.article = article
        if (!article) {
            return res.status(404).end()
        }
        next()
    },

    //通过文章的作者id验证是否是该登录用户
    async(req, res, next) => {
        if (String(req.user._id) != String(req.article.author)) {
            return res.status(403).end()
        }
        next()
    }
]

exports.deleteArticle = exports.updateArticle