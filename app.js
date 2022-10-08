const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorhandler = require('./middleware/error-handlers')

//连接数据库
require('./model')
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const PORT = process.env.PORt || 3000

app.use('/api', router)

app.use(errorhandler())

app.listen(PORT, () => {
    console.log('Server is running')
})