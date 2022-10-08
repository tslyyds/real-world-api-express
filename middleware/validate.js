const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose')

//请求验证格式
exports = module.exports = validations => {
    return async(req, res, next) => {
        //将传进来的validations进行判断
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

exports.isValidObjectId = (location, fields) => {
    return buildCheckFunction(location)(fields).custom(async value => {
        if (!isValidObjectId(value)) {
            return Promise.reject('ID 不是一个有效的 objectID!')
        }
    })
}