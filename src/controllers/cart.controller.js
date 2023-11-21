const makeCartService = require('../services/cart.service');
const ApiError = require('../api-error');

const cartService = makeCartService();

async function getCart(req, res, next) {
    try {
        const cart = await cartService.getCart(req.user.id); // Giả sử thông tin người dùng đã được lưu trong req.user
        return res.json(cart);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while retrieving cart'));
    }
}

async function addToCart(req, res, next) {
    try {
        const userId = req.user.id;
        const gameId = req.params.gameId;

        await cartService.addToCart(userId, gameId);

        res.json({ success: true, message: 'Game added to cart successfully' });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while adding to cart'));
    }
}

async function removeFromCart(req, res, next) {
    try {
        const userId = req.user.id;
        const gameId = req.params.gameId;

        await cartService.removeFromCart(userId, gameId);

        res.json({ success: true, message: 'Game removed from cart successfully' });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while removing from cart'));
    }
}

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
};
