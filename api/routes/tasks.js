const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

//ALL TASK
router.get('/', async (req,res) => {
    try{
        const tasks = await Task.find()
        res.status(200).json(tasks)
    }catch(err){
        res.status(403).json({message: err})
    }
})

//ONE TASK BY ID
router.get('/:taskId', async (req, res) => {
    try{
        const task = await Task.findById(req.params.taskId)
        res.status(200).json(task)
    }catch(err){
        res.status(403).json({message: err})
    }
    
})

//NEW TASK
router.post('/', async (req, res) => {
    const task = new Task({
        taskName: req.body.taskName,
        done: req.body.done,
        geo: req.body.geo
    })

    try{
        const savedTask = await task.save()
        res.status(200).json(savedTask)
    }catch(err){
        res.status(403).json({message: err})
    }
})

//DELTE POST BY ID
router.delete('/:taskId', async (req, res) => {
    try{
        const removedTask = await Task.deleteOne({_id: req.params.taskId})
        res.status(200).json(removedTask)
    }catch(err){
        res.status(403).json({message: err})
    }
})

//UPDATE POST
router.patch('/:taskId', async (req, res) => {
    try{
        const UpdatedTask = await Task.updateOne(
            {_id: req.params.taskId},
            { $set: {done: req.body.done}}
        )
        res.status(200).json(UpdatedTask)
    }catch(err){
        res.status(403).json({message: err})
    }
})

module.exports = router