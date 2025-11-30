const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/posts');

const app = express();

// Підключення до MongoDB Atlas з обробкою помилок
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://denyslahoida_db_user:bxVoJ1pZPKDsz13Z@cluster0.yjsfxvf.mongodb.net/blog?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 секунд
    socketTimeoutMS: 45000, // 45 секунд
})
.then(() => console.log('✅ Connected to MongoDB Atlas!'))
.catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Базовий маршрут для перевірки
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Маршрути
app.use('/', postRoutes);

// Обробка 404
app.use((req, res) => {
    res.status(404).render('error', { error: { message: 'Сторінку не знайдено' } });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});