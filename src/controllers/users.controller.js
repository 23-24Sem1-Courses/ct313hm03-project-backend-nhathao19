
const makeUserService = require('../services/users.service');
const ApiError = require('../api-error');



async function createUser(req, res, next) {
    try {
        const userService = makeUserService();
        const user = await userService.createUser(req.body);
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, 'An error occurred while creating the user')
        );
    }
}

async function getUsersByFilter(req, res, next) {
    try {
        const userService = makeUserService();
        const users = await userService.getManyUsers(req.query);
        return res.send(users);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving users')
        );
    }
}

async function getUser(req, res, next) {
    try {
        const userService = makeUserService();
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send(user);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                `Error retrieving user with id=${req.params.id}`
            )
        );
    }
}

async function updateUser(req, res, next) {
    try {
        const userService = makeUserService();
        const update = await userService.updateUser(req.params.id, req.body);
        if (!update) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send({ message: 'User was updated successfully' });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
}

async function deleteUser(req, res, next) {
    try {
        const userService = makeUserService();
        const deleted = await userService.deleteUser(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send({ message: 'User was deleted successfully' });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                `Could not delete user with id=${req.params.id}`
            )
        );
    }
}

async function deleteAllUsers(req, res, next) {
    try {
        const userService = makeUserService();
        const deleted = await userService.deleteAllUsers();
        return res.send({
            message: `${deleted} users were deleted successfully`,
        });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, 'An error occurred while removing all users')
        );
    }
}

module.exports = {
    getUsersByFilter,
    deleteAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
