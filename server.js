require('dotenv').config();
const app = require('./src/app');

//Khởi động server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});