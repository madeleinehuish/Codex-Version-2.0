'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

// const authorize = function(req, res, next) {
//   const token = req.cookies.token;
//
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return next(boom.create(401, 'Unauthorized'));
//     }
//     req.token = decoded;
//     next();
//   });
// };

router.get('/api-snippets/:id', (req, res, next) => {
  const userId = Number.parseInt(req.params.id);

  if (!Number.isInteger(userId)) {
    return next(boom.create(400, 'Order Id must be an integer'));
  }

  let snippets;
  console.log('got through up to knex');

  knex('snippets')
    .where('user_id', req.params.id)
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }
      snippets = camelizeKeys(row);
      return snippets;
      console.log('first knex');
    })
    .then((snippets) => {
      return knex('snippets')
      .orderBy('title')
      console.log(snippets);
    })
    .then((rows) => {
      const snippetsData = camelizeKeys(rows);
      console.log(snippetsData);
      res.send({ snippetsData });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
