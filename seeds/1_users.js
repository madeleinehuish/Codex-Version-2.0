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
        gist_url: 'testing@testing.com',
        github_id: 'test',
        github_token: 'test1',
        avatar: ''
      }, {
        id: 2,
        first_name: 'Scooby',
        last_name: 'Doo',
        email: 'scoobydoo@gmail.com',
        gist_url: 'testing2@testing2.com',
        github_id: '123456789',
        github_token: '45324678909999',
        avatar: ''
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
