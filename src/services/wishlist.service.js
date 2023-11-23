const knex = require('../database/knex');
const ApiError = require('../api-error');

function makeWishlistService() {
  async function getWishlist(userId, { page = 1, limit = 10 }) {
    try {
      const wishlist = await knex('wishlist')
        .where({ user_id: userId })
        .limit(limit)
        .offset((page - 1) * limit);

      const totalItems = await knex('wishlist').where({ user_id: userId }).count('game_id as total').first();

      return {
        metadata: {
          page,
          limit,
          totalItems: totalItems.total,
        },
        wishlist,
      };
    } catch (error) {
      throw new ApiError(500, 'An error occurred while retrieving wishlist');
    }
  }

  async function addToWishlist(userId, gameId) {
    try {
      const exists = await knex('wishlist').where({ user_id: userId, game_id: gameId }).first();
      if (!exists) {
        await knex('wishlist').insert({ user_id: userId, game_id: gameId });
      }
    } catch (error) {
      throw new ApiError(500, 'An error occurred while adding to wishlist');
    }
  }

  async function removeFromWishlist(userId, gameId) {
    try {
      const exists = await knex('wishlist').where({ user_id: userId, game_id: gameId }).first();
      if (exists) {
        await knex('wishlist').where({ user_id: userId, game_id: gameId }).del();
      }
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
