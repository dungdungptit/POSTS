const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()

// Load model
const Post = require('../models/Post')

// Hien thi tat ca cac bai viet
router.get('/', async (req, res) => {
    const posts = await Post.find().lean().sort({ date: -1 })
    res.render('posts/index', { posts })
})

// Hien thi form de tao bai viet moi
// req: require, res: respone
router.get('/add', (req, res) => {
    res.render('posts/add')
})

// Tao post moi
router.post('/', async (req, res) => {
    const { title, text } = req.body;

    let errors = []

    if (!title) errors.push({ msg: 'Title required' })
    if (!text) errors.push({ msg: 'Text required' })
    if (errors.length > 0) res.render('posts/add', { errors, title, text })
    else {
        const newPostData = { title, text }
        const newPost = new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

// Hien thi form de nguoi dung sua
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean()
    res.render('posts/edit', { post })
})

// Luu lai thay doi
router.put('/:id', async (req, res) => {
    const { title, text } = req.body
    await Post.findOneAndUpdate({ _id: req.params.id }, { title, text })
    res.redirect('/posts')
})

// Xoa bai viet
router.delete('/delete/:id', async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id })
    res.redirect('/posts')
})

module.exports = router