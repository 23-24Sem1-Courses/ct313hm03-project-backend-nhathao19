// knexfile.js
module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3307,
    database: 'game_store',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};
