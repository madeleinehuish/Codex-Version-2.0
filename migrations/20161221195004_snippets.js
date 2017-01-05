
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('snippets', (table) => {
    table.increments();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.string('title').notNullable().defaultTo('');
    table.text('code_snippet').notNullable().defaultTo('');
    table.text('notes').notNullable().defaultTo('');
    table.string('language').notNullable().defaultTo('');
    table.string('keywords').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('snippets');
};
