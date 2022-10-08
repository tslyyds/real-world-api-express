exports.getTags = async(req, res, next) => {
    try {
        res.send('get /tags')
    } catch (error) {
        next(error)
    }
}