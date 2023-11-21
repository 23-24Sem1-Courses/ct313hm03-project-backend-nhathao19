const makeWishlistService = require('../services/wishlist.service');
const ApiError = require('../api-error');

const wishlistService = makeWishlistService();

async function getWishlist(req, res, next) {
    try {
        const wishlist = await wishlistService.getWishlist(req.user.id); // Giả sử thông tin người dùng đã được lưu trong req.user
        return res.json(wishlist);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while retrieving wishlist'));
    }
}

async function addToWishlist(req, res, next) {
    try {
        const userId = req.user.id;
        const gameId = req.params.gameId;

        await wishlistService.addToWishlist(userId, gameId);

        res.json({ success: true, message: 'Game added to wishlist successfully' });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while adding to wishlist'));
    }
}

async function removeFromWishlist(req, res, next) {
    try {
        const userId = req.user.id;
        const gameId = req.params.gameId;

        await wishlistService.removeFromWishlist(userId, gameId);

        res.json({ success: true, message: 'Game removed from wishlist successfully' });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while removing from wishlist'));
    }
}

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
};
