exports.getUserProfile = async(req, res, next) => {
    try {
        res.send('get /profile/:username')
    } catch (error) {
        next(error)
    }
}

exports.followUser = async(req, res, next) => {
    try {
        res.send('post /profile/:username/follow')
    } catch (error) {
        next(error)
    }
}


exports.cancleFollow = async(req, res, next) => {
    try {
        res.send('delete /profile/:username/follow')
    } catch (error) {
        next(error)
    }
}