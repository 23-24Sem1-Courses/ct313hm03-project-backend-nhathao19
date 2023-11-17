// migrations/YYYYMMDD_create_users_and_games_tables.js
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('email');
      table.string('password');
      // Thêm các trường khác cần thiết
    })
    .createTable('games', function (table) {
      table.increments('id').primary();
      table.string('title');
      table.text('description');
      table.decimal('price', 8, 2);
      // Thêm các trường khác cần thiết
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users').dropTable('games');
};
