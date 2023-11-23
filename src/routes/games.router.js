const express = require('express');
const gamesController = require('../controllers/games.controller');
const userController = require('../controllers/users.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const router = express.Router();

router
    .route('/')
    .get(gamesController.getManyGames)
    .post(gamesController.createGame)
    .delete(gamesController.deleteAllGames)
    .all(methodNotAllowed);

router
    .route('/:id')
    .get(gamesController.getGameById)
    .put(gamesController.updateGame)
    .delete(gamesController.deleteGame)
    .all(methodNotAllowed);

router
    .route('/users/:id')
    .get(userController.getUser)
    .all(methodNotAllowed);

module.exports = router;
