const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/posts');

const app = express();

// Підключення до MongoDB Atlas
mongoose.connect('mongodb+srv://denyslahoida_db_user:bxVoJ1pZPKDsz13Z@cluster0.yjsfxvf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Перевірка підключення
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log('✅ Successfully connected to MongoDB Atlas!');
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Маршрути
app.use('/', postRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});