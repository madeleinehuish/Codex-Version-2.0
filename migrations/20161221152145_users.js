'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').notNullable();
    table.string('gist_url').notNullable();
    table.string('github_id').unique().notNullable();
    table.string('github_token').notNullable();
    table.string('avatar').defaultTo('')
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
