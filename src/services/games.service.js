const knex = require('../database/knex');
const Paginator = require('../services/paginator');

function makeGamesService() {
    function readGame(payload) {
        const game = {
            title: payload.title,
            describe: payload.describe,
            // Các trường khác của game
        };

        // Loại bỏ các trường có giá trị undefined
        Object.keys(game).forEach(
            (key) => game[key] === undefined && delete game[key]
        );

        return game;
    }

    async function createGame(payload) {
        const game = readGame(payload);
        const [id] = await knex('games').insert(game);
        return { id, ...game };
    }

    async function getManyGames(query) {
        const { title, page = 1, limit = 5 } = query;
        const paginator = new Paginator(page, limit);

        let results = await knex('games')
            .where((builder) => {
                if (title) {
                    builder.where('title', 'like', `%${title}%`);
                }
                // Các điều kiện tìm kiếm khác
            })
            .select(
                knex.raw('count(id) OVER() AS recordsCount'),
                'id',
                'title',
                'describe'
                // Các trường khác của game
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
            games: results,
        };
    }

    async function getGameById(id) {
        return knex('games').where('id', id).select('*').first();
    }

    async function updateGame(id, payload) {
        const update = readGame(payload);
        return knex('games').where('id', id).update(update);
    }

    async function deleteGame(id) {
        return knex('games').where('id', id).del();
    }

    async function deleteAllGames() {
        return knex('games').del();
    }

    return {
        createGame,
        getManyGames,
        getGameById,
        updateGame,
        deleteGame,
        deleteAllGames,
    };
}

module.exports = makeGamesService;
