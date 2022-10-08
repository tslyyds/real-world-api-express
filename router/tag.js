const express = require('express')

const router = express.Router()
const tags = require('../controller/tags')

// 获取标签列表
router.get('/tags', tags.getTags)

module.exports = router