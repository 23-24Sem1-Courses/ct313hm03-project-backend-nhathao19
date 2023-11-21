// Import knex hoặc database connection
const knex = require('../database/knex');
const ApiError = require('../api-error');
const Paginator = require('../path/to/Paginator'); // Đường dẫn đến thư viện Paginator

function makeCartService() {
  async function getCart(userId, query) {
    try {
      const { page = 1, limit = 10 } = query;
      const paginator = new Paginator(page, limit);

      // Thực hiện logic để lấy thông tin Cart từ database với phân trang
      const cart = await knex
        .select()
        .table('cart')
        .where({ user_id: userId })
        .limit(paginator.limit)
        .offset(paginator.offset);

      return {
        metadata: paginator.getMetadata(cart.length),
        cart,
      };
    } catch (error) {
      throw new ApiError(500, 'An error occurred while retrieving cart');
    }
  }

  async function addToCart(userId, gameId) {
    try {
      // Thực hiện logic để thêm Game vào Cart trong database
      await knex('cart').insert({ user_id: userId, game_id: gameId });
    } catch (error) {
      throw new ApiError(500, 'An error occurred while adding to cart');
    }
  }

  async function removeFromCart(userId, gameId) {
    try {
      // Thực hiện logic để xóa Game khỏi Cart trong database
      await knex('cart').where({ user_id: userId, game_id: gameId }).del();
    } catch (error) {
      throw new ApiError(500, 'An error occurred while removing from cart');
    }
  }

  return {
    getCart,
    addToCart,
    removeFromCart,
  };
}

module.exports = makeCartService;
