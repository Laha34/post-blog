const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Головна сторінка - список постів
router.get('/', postController.getAllPosts);

// Форма створення нового посту
router.get('/posts/new', postController.showCreateForm);

// Створення посту (POST запит)
router.post('/posts', postController.createPost);

// Перегляд одного посту
router.get('/posts/:id', postController.getPost);

// Форма редагування посту
router.get('/posts/:id/edit', postController.showEditForm);

// Оновлення посту (PUT запит)
router.put('/posts/:id', postController.updatePost);

// Видалення посту (DELETE запит)
router.delete('/posts/:id', postController.deletePost);

module.exports = router;