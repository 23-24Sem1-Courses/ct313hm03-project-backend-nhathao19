const makeGamesService = require('../services/games.service');
const ApiError = require('../api-error');

const gamesService = makeGamesService();

async function getManyGames(req, res, next) {
    try {
        const games = await gamesService.getManyGames(req.query);
        return res.json(games);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while retrieving games'));
    }
}

async function createGame(req, res, next) {
    try {
        const game = await gamesService.createGame(req.body);
        return res.status(201).json(game);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while creating the game'));
    }
}

async function getGameById(req, res, next) {
    try {
        const game = await gamesService.getGameById(req.params.id);
        if (!game) {
            return next(new ApiError(404, 'Game not found'));
        }
        return res.json(game);
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error retrieving game with id=${req.params.id}`));
    }
}

async function updateGame(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const update = await gamesService.updateGame(req.params.id, req.body);
        if (!update) {
            return next(new ApiError(404, 'Game not found'));
        }
        return res.json({ message: 'Game updated successfully' });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Error updating game with id=${req.params.id}`));
    }
}

async function deleteGame(req, res, next) {
    try {
        const deleted = await gamesService.deleteGame(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'Game not found'));
        }
        return res.json({ message: 'Game deleted successfully' });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, `Could not delete game with id=${req.params.id}`));
    }
}

async function deleteAllGames(req, res, next) {
    try {
        const deleted = await gamesService.deleteAllGames();
        return res.json({ message: `${deleted} games were deleted successfully` });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while removing all games'));
    }
}

module.exports = {
    getManyGames,
    createGame,
    getGameById,
    updateGame,
    deleteGame,
    deleteAllGames,
};
