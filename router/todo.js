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

router.put('/toggle-done-by-id', (req, res)=>{
    let foundItem = todos.find(item => item.id === req.body.id)
    if(foundItem){
        let place = todos.indexOf(foundItem)
        let isDone
        if(foundItem.done === "true"){
            isDone = "false"
        }else{
            isDone = "true"
        }
        let updatedItem = {
            id: foundItem.id,
            todo: foundItem.todo,
            done: isDone
        }
        todos = todos.slice(0,place).concat(updatedItem).concat(todos.slice(place+1,todos.length))
        res.json({message: "Todo updated", payload: todos})
    }else{
        res.json({message: "Item not found, please check ID."})
    }
})

router.delete('/delete-todo-by-id', (req, res)=>{
    let foundItem = todos.find(item => item.id === req.body.id)
    if(foundItem){
        let place = todos.indexOf(foundItem)
        todos.splice(place,1)
        res.json({message: "Todo deleted", payload: todos})
    }else{
        res.json({message: "Item not found, please check ID."})
    }
})

module.exports = router