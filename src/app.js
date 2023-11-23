const express = require('express');
const cors = require('cors');
const app = express();

const usersRouter = require('./routes/users.router');
const gamesRouter = require('./routes/games.router');
const wishlistRouter = require('./routes/wishlist.router');

const {
    resourceNotFound,
    handleError
} = require('./controllers/errors.controller');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to COG Store' });
});

// Kết nối router cho quản lý người dùng
app.use('/api/users', usersRouter);

// Kết nối router cho quản lý game
app.use('/api/games', gamesRouter);

// Kết nối router cho chức năng wishlist
app.use('/api/wishlist', wishlistRouter);
app.get('/api/wishlist', (req, res) => {
    res.json({ message: 'Welcome to WishList' });
});

// Xử lý lỗi 404.
app.use(resourceNotFound);

// Định nghĩa middleware xử lý lỗi sau cùng.
app.use(handleError);

module.exports = app;
