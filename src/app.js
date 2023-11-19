const express = require('express');
const cors = require('cors');

const app = express();
const contactsRouter = require('./routes/contacts.router');

const {
resourceNotFound,
handleError
} = require('./controllers/errors.controller');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.'});
});
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});
app.use('/app/contacts', contactsRouter);
app.use('/api/contacts', contactsRouter);

// Xử lý lỗi 404.
app.use(resourceNotFound);

// Định nghĩa middleware xử lý lỗi sau cùng.
app.use(handleError);

module.exports = app;