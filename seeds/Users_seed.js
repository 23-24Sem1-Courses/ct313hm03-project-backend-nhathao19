const { faker } = require('@faker-js/faker');

function createUser() {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: faker.internet.password(),
    };
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('users').del();
    await knex('users').insert(Array(100).fill().map(createUser));
};
