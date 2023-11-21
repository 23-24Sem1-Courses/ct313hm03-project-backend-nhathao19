const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware để kiểm tra đăng nhập
router.use(authMiddleware.requireAuth);

// Routes liên quan đến Cart
router.get('/cart', cartController.getCart);
router.post('/cart/:gameId/add', cartController.addToCart);
router.post('/cart/:gameId/remove', cartController.removeFromCart);

module.exports = router;
