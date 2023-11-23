const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');


// Routes liên quan đến Wishlist
router
    .route('/wishlist/:id')
    .get(wishlistController.getWishlist)
    .post(wishlistController.addToWishlist)
    .delete(wishlistController.removeFromWishlist)
    .all(methodNotAllowed);

module.exports = router;
