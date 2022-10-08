const express = require('express')

const router = express.Router()
const profile = require('../controller/profile')

// 获取用户资料
router.get('/:username', profile.getUserProfile)

// 关注用户
router.post('/:username/follow', profile.followUser)

// 取消用户关注
router.delete('/:username/follow', profile.cancleFollow)

module.exports = router