const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//ALL POSTS
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }catch(err){
        res.status(403).json({message: err})
    }
})

//ONE POST BY ID
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId)
        res.status(200).json(post)
    }catch(err){
        res.status(403).json({message: err})
    }
    
})

//NEW POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try{
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(403).json({message: err})
    }
})

//DELTE POST BY ID
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId})
        res.status(200).json(removedPost)
    }catch(err){
        res.status(403).json({message: err})
    }
})

//UPDATE POST
router.patch('/:postId', async (req, res) => {
    try{
        const UpdatedPost = await Post.updateOne(
            {_id: req.params.postId},
            { $set: {title: req.body.title}}
        )
        res.status(200).json(UpdatedPost)
    }catch(err){
        res.status(403).json({message: err})
    }
})

module.exports = router