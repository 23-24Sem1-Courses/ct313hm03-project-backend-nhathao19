// Import knex hoặc database connection
const knex = require('../database/knex');
const ApiError = require('../api-error');
const Paginator = require('../path/to/Paginator'); // Đường dẫn đến thư viện Paginator

function makeWishlistService() {
  async function getWishlist(userId, query) {
    try {
      const { page = 1, limit = 10 } = query;
      const paginator = new Paginator(page, limit);

      // Thực hiện logic để lấy thông tin Wishlist từ database với phân trang
      const wishlist = await knex
        .select()
        .table('wishlist')
        .where({ user_id: userId })
        .limit(paginator.limit)
        .offset(paginator.offset);

      return {
        metadata: paginator.getMetadata(wishlist.length),
        wishlist,
      };
    } catch (error) {
      throw new ApiError(500, 'An error occurred while retrieving wishlist');
    }
  }

  async function addToWishlist(userId, gameId) {
    try {
      // Thực hiện logic để thêm Game vào Wishlist trong database
      await knex('wishlist').insert({ user_id: userId, game_id: gameId });
    } catch (error) {
      throw new ApiError(500, 'An error occurred while adding to wishlist');
    }
  }

  async function removeFromWishlist(userId, gameId) {
    try {
      // Thực hiện logic để xóa Game khỏi Wishlist trong database
      await knex('wishlist').where({ user_id: userId, game_id: gameId }).del();
    } catch (error) {
      throw new ApiError(500, 'An error occurred while removing from wishlist');
    }
  }

  return {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
  };
}

module.exports = makeWishlistService;
