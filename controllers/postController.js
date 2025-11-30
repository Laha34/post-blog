const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.render('posts', { posts });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('post', { post });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

exports.showCreateForm = (req, res) => {
    res.render('add-post');
};

exports.createPost = async (req, res) => {
    try {
        const { title, description, author } = req.body;
        await Post.create({ title, description, author });
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

exports.showEditForm = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit-post', { post });
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, description, author } = req.body;
        await Post.findByIdAndUpdate(req.params.id, { title, description, author });
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { error });
    }
};