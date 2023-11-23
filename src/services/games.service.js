const knex = require('../database/knex');
const Paginator = require('../services/paginator');

function makeGamesService() {
    function readGame(payload) {
        const game = {
            title: payload.title,
            description: payload.description,
            price: payload.price
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
        const [id] = await knex('game_list').insert(game);
        return { id, ...game };
    }

    async function getManyGames(query) {
        const { title, page = 1, limit = 5 } = query;
        const paginator = new Paginator(page, limit);

        let results = await knex('game_list')
            .where((builder) => {
                if (title) {
                    builder.where('title', 'like', `%${title}%`);
                }
                // Các điều kiện tìm kiếm khác
            })
            .select(
                knex.raw('count(game_id) OVER() AS recordsCount'),
                'game_id',
                'title',
                'description'
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
        return knex('game_list').where('game_id', id).select('*').first();
    }

    async function updateGame(id, payload) {
        const update = readGame(payload);
        return knex('game_list').where('game_id', id).update(update);
    }

    async function deleteGame(id) {
        return knex('game_list').where('game_id', id).del();
    }

    async function deleteAllGames() {
        return knex('game_list').del();
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
