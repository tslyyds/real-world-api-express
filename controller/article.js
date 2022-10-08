const { Article, User } = require('../model')

// 获取指定数目文章
exports.returnNewArticle = async(req, res, next) => {
    try {
        //获取用户指定的信息
        const filter = {}
        const {
            limit = 20,
                offset = 0,
                tag,
                author
        } = req.query
        if (tag) {
            filter.tagList = tag
        }
        if (author) {
            const user = await User.findOne({ username: author })
            filter.author = user ? user._id : null
        }
        const articles = await Article.find(filter)
            .skip(Number.parseInt(offset)) //跳过几条
            .limit(Number.parseInt(limit)) //查询几条
            .sort({
                createdAt: -1 //倒叙排序
            })
        const articlesCount = await Article.countDocuments()
        if (!articles) {
            return res.status(404).end()
        }
        res.status(200).json({
            articles,
            articlesCount
        })
    } catch (error) {
        next(error)
    }
}

// 关注的用户创建的多篇文章
exports.followCreate = async(req, res, next) => {
    try {
        res.send('get /articles/feed')
    } catch (error) {
        next(error)
    }
}

// 根据文章id获取文章
exports.returnArticle = async(req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleID).populate('author')
        if (!article) {
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 创建文章
exports.createArticle = async(req, res, next) => {
    try {
        const article = new Article(req.body.article)
        article.author = req.user._id;
        article.populate('author')
        await article.save()
            // console.log(article)

        res.status(201).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 更新文章
exports.updateArticle = async(req, res, next) => {
    try {
        //获取用户输入的更新信息并更新
        const article = req.article
        const articleBody = req.body.article
        article.title = articleBody.title || article.title;
        article.description = articleBody.description || article.description;
        article.body = articleBody.body || article.body;

        await article.save()
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 删除文章
exports.deleteArticle = async(req, res, next) => {
    try {
        const article = req.article
        await article.remove()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

// 返回创建的评论
exports.returnCreateArticle = async(req, res, next) => {
    try {
        res.send('post /articles/:slug/comments')
    } catch (error) {
        next(error)
    }
}

// 返回多条评论
exports.returnComments = async(req, res, next) => {
    try {
        res.send('get /articles/:slug/comments')
    } catch (error) {
        next(error)
    }
}

// 删除评论
exports.deleteComment = async(req, res, next) => {
    try {
        res.send('delete /articles/:slug/comments/:id')
    } catch (error) {
        next(error)
    }
}

// 返回最喜欢的文章
exports.returnFavArticle = async(req, res, next) => {
    try {
        res.send('post /articles/:slug/favorite')
    } catch (error) {
        next(error)
    }
}

// 删除最喜欢的文章
exports.deleteFavArticle = async(req, res, next) => {
    try {
        res.send('delete /articles/:slug/favorite')
    } catch (error) {
        next(error)
    }
}