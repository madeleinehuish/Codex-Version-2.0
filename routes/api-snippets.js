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
      if (!row) {
        throw boom.create(404, 'Not Found');
      }
      snippets = camelizeKeys(row);
      return snippets;
    })
    .then((snippets) => {
      return knex('snippets')
             .orderBy('title')

    })
    .then((rows) => {
      const snippetsData = camelizeKeys(rows);
      res.send({ snippetsData });
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/api-snippets/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }
  const updateSnippet = {};
  console.log('got into patch');
  console.log(req.body);

  knex('snippets')
    .where('id', id)
    .first()
    .then((snippet) => {
      if (!snippet) {
        throw boom.create(404, 'Not Found');
      }
      const { title, codeSnippet, keywords, notes } = req.body;

      if (title) {
        updateSnippet.title = title;
      }
      if (codeSnippet) {
        updateSnippet.codeSnippet = codeSnippet;
      }
      if (keywords) {
        updateSnippet.keywords = keywords;
      }
      if (notes) {
        updateSnippet.notes = notes;
      }

      return knex('snippets')
        .where('id', id)
        .update(decamelizeKeys(updateSnippet), '*');
    })
    .then((rows) => {
      const snippet = camelizeKeys(rows[0]);

      res.send(snippet);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
