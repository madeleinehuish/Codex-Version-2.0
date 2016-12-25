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

  knex('snippets')
    // .whereRaw('user_id = ?', [req.params.id])
    .where('user_id', userId)
    .then((row) => {
      console.log(userId);
      console.log(typeof(userId));
      console.log(row);
      console.log('first knex');
      if (!row) {
        throw boom.create(404, 'Not Found');
      }
      snippets = camelizeKeys(row);
      return snippets;

    })
    .then((snippets) => {
      console.log('second knex');
      return knex('snippets')
      .orderBy('title')

    })
    .then((rows) => {
      const snippetsData = camelizeKeys(rows);
      console.log('third knex');
      res.send({ snippetsData });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
