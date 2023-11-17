const express = require('express');
const cors = require('cors');

const app = express();
/*
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ct313h_labs',
  },
});
*/

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.json({ message: 'Welcome to our website.'});
});

// Tạo trang đăng ký
/*
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});
*/
// Xử lý đăng ký
/*
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const userExists = await knex('users').where({ email }).first();
    if (userExists) {
      return res.status(409).send('Email đã tồn tại.');
    }

    // Thêm người dùng mới vào database
    await knex('users').insert({ username, email, password });
    
    res.status(201).send('Đăng ký thành công!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server.');
  }
});
*/


module.exports = app;
