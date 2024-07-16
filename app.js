const express = require('express')
const logger = require('morgan')
const app = express()
const index = require('./router/index')
const todo = require('./router/todo')
//npm i cors and then import it whenever you have a separate front end trying to call from this back end
const cors = require('cors')
app.use(logger('dev'))

app.use(cors())
app.use(express.json())

app.use('/', index)
app.use('/api/todo', todo)

app.listen(3000, ()=>{
    console.log('server started on port 3000')
})