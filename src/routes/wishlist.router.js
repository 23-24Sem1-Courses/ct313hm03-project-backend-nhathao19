const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistcontroller');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware để kiểm tra đăng nhập
router.use(authMiddleware.requireAuth);

// Routes liên quan đến Wishlist
router.get('/', wishlistController.getWishlist);
router.post('/:gameId/add', wishlistController.addToWishlist);
router.post('/:gameId/remove', wishlistController.removeFromWishlist);

module.exports = router;
