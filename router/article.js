const express = require('express')
const router = express.Router()
const auth = require('../model/auth')

const article = require('../controller/article')
const articleValidator = require('../validator/article')

// 返回最新文章
router.get('/', article.returnNewArticle)

// 关注的用户创建的多篇文章
router.get('/feed', article.followCreate)

// 返回单篇文章
router.get('/:articleID', articleValidator.getArticle, article.returnArticle)

// 创建文章
router.post('/', auth, articleValidator.createArticle, article.createArticle)

// 返回更新的文章
router.put('/:articleID', auth, articleValidator.updateArticle, article.updateArticle)

// 删除文章
router.delete('/:articleID', auth, articleValidator.deleteArticle, article.deleteArticle)

// 返回创建的评论
router.post('/:articleID/comments', article.returnCreateArticle)

// 返回多条评论
router.get('/:articleID/comments', article.returnComments)

// 删除评论
router.delete('/:articleID/comments/:id', article.deleteComment)

// 返回最喜欢的文章
router.post('/:articleID/favorite', article.returnFavArticle)

// 删除最喜欢的文章
router.delete('/:articleID/favorite', article.deleteFavArticle)


module.exports = router