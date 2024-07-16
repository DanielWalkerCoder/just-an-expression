const express = require('express')
const router = express.Router()
const uuidv4 = require('uuid').v4

let todos = [
    {
      id: "haf24jd",
      todo: "do laundry",
      done: "false"
    },
    {
      id: "jp2nkl2",
      todo: "wash dishes",
      done: "true"
    }
]

router.get('/get-all-todos', (req, res)=>{
    res.json({payload: todos})
})

router.get('/get-todo-by-id/:id', (req, res)=>{
    let foundItem = todos.find(item => item.id === req.params.id)
    if(foundItem){
        res.json({payload: foundItem})
    }else{
        res.json({message: "The Todo ID you are looking for does not exist, please check the ID"})
    }
})

router.get('/get-todos-by-done/:done', (req, res)=>{
    let newDoneArray = []
    for(let each of todos){
        if(each.done === req.params.done){
            newDoneArray.push(each)
        }
    }
    res.json({payload: newDoneArray})
})

router.post('/create-new-todo', (req, res)=>{
    let newTodo = {
        id: uuidv4(),
        todo: req.body.todo,
        done: "false"
    }
    todos.push(newTodo)
    res.json({payload: todos})
})

module.exports = router