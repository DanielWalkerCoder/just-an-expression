const express = require('express')
const logger = require('morgan')
const app = express()
const index = require('./router/index')
const todo = require('./router/todo')

app.use(logger('dev'))
app.use(express.json())

app.use('/', index)
app.use('/api/todo', todo)

app.listen(3000, ()=>{
    console.log('server started on port 3000')
})