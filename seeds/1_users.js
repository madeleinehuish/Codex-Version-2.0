/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        first_name: 'Code',
        last_name: 'Girl',
        email: 'test@email.com',
        github_id: 'test'
      }, {
        id: 2,
        first_name: 'Scooby',
        last_name: 'Doo',
        email: 'scoobydoo@gmail.com',
        github_id: 'test2'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
