const express = require('express');
const usersController = require('../controllers/users.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const router = express.Router();

router
    .route('/')
    .get(usersController.getUsersByFilter)
    .post(usersController.createUser)
    .delete(usersController.deleteAllUsers)
    .all(methodNotAllowed);

router
    .route('/:id')
    .get(usersController.getUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)
    .all(methodNotAllowed);

module.exports = router;
