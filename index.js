// index.js
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = knex(require('./knexfile'));

// API lấy danh sách game
app.get('/api/games', async (req, res) => {
  try {
    const games = await db.select().table('games');
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Thực hiện xác thực người dùng, ví dụ: so sánh với thông tin trong CSDL
  // Trả về thông tin người dùng nếu đăng nhập thành công
  const user = await db('users').where({ username, password }).first();

  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Thêm người dùng mới vào CSDL
    const newUser = await db('users').insert({ username, email, password });

    res.json({ user: { id: newUser[0], username, email } });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Thêm các API khác tương tự

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
