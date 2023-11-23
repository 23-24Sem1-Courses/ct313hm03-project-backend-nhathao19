const bcrypt = require('bcrypt');
const knex = require('../database/knex');
const Paginator = require('./paginator');

const saltRounds = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

function makeUserService() {
    function readUser(payload) {
        const user = {
            username: payload.username,
            email: payload.email,
            first_name: payload.first_name,
            last_name: payload.last_name,
            // password: payload.password, // Không lưu mật khẩu trực tiếp trong service
        };

        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );

        return user;
    }

    async function createUser(payload) {
        const user = readUser(payload);
        const hashedPassword = await hashPassword(payload.password);
        const [id] = await knex('user_account').insert({
            ...user,
            password: hashedPassword,
        });
        return { id, ...user };
    }

    async function getManyUsers(query) {
        const { username, email, page = 1, limit = 5 } = query;
        const paginator = new Paginator(page, limit);

        let results = await knex('user_account')
            .where((builder) => {
                if (username) {
                    builder.where('username', 'like', `%${username}%`);
                }
                if (email) {
                    builder.where('email', 'like', `%${email}%`);
                }
            })
            .select(
                knex.raw('count(user_id) OVER() AS recordsCount'),
                'user_id',
                'username',
                'email',
                'first_name',
                'last_name'
            )
            .limit(paginator.limit)
            .offset(paginator.offset);

        let totalRecords = 0;
        results = results.map((result) => {
            totalRecords = result.recordsCount;
            delete result.recordsCount;
            return result;
        });

        return {
            metadata: paginator.getMetadata(totalRecords),
            users: results,
        };
    }

    async function getUserById(id) {
        return knex('user_account').where('user_id', id).select('*').first();
    }

    async function updateUser(id, payload) {
        const update = readUser(payload);

        // Không cập nhật mật khẩu nếu không được cung cấp
        if (payload.password) {
            update.password = await hashPassword(payload.password);
        }

        return knex('user_account').where('user_id', id).update(update);
    }

    async function deleteUser(id) {
        return knex('user_account').where('user_id', id).del();
    }

    async function deleteAllUsers() {
        return knex('user_account').del();
    }

    return {
        createUser,
        getManyUsers,
        getUserById,
        updateUser,
        deleteUser,
        deleteAllUsers,
    };
}

module.exports = makeUserService;
