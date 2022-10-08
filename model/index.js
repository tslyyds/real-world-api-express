const mongoose = require('mongoose');
const { dbURi } = require('../config/config.default')
mongoose.connect(dbURi);

const db = mongoose.connection

// 数据库连接失败时：
db.on('error', (err) => {
    console.log('数据库连接失败' + err)
})

// 数据库连接成功时
db.once('open', () => {
    console.log('数据库连接成功')
})

// // 创建一个实例
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
module.exports = {
    User: mongoose.model("User", require('./user')),
    Article: mongoose.model('Article', require('./article'))
}