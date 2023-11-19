const bcrypt = require('bcrypt');
const makeUserService = require('../services/user.service');
const ApiError = require('../api-error');

const saltRounds = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

async function createUser(req, res, next) {
    const { username, email, first_name, last_name, password } = req.body;

    // Kiểm tra xem các trường thông tin cần thiết có tồn tại không
    if (!username || !email || !first_name || !last_name || !password) {
        return next(new ApiError(400, 'All fields are required'));
    }

    try {
        const userService = makeUserService();
        const hashedPassword = await hashPassword(password);
        const user = await userService.createUser({
            username,
            email,
            first_name,
            last_name,
            password: hashedPassword,
        });
        return res.send(user);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while creating the user')
        );
    }
}

async function getUsersByFilter(req, res, next) {
    let users = [];

    try {
        const userService = makeUserService();
        users = await userService.getManyUsers(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving users')
        );
    }

    return res.send(users);
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
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving user with id=${req.params.id}`
            )
        );
    }
}

async function updateUser(req, res, next) {
    const { username, email, first_name, last_name, password } = req.body;

    // Kiểm tra xem dữ liệu cập nhật có trống hay không
    if (!Object.keys(req.body).length) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const userService = makeUserService();
        const update = await userService.updateUser(req.params.id, {
            username,
            email,
            first_name,
            last_name,
            password,
        });
        if (!update) {
            return next(new ApiError(404, 'User not found'));
        }
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
