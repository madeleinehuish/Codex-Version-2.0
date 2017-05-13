'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const _ = require('lodash');
const async = require('async');
const axios = require('axios');
const request = require('request-promise');
// var mysql = require('mysql');
// var algoliasearch = require('algoliasearch');
// var client = algoliasearch("N1SG3F753R", "••••••••••••••••••••••••••••••••");
// var index = client.initIndex('snippets');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }
    req.token = decoded;
    next();
  });
};


// this code pulls all snippets into state at beginning of load
router.get(`/api-snippets/:id`, authorize, (req, res, next) => {
  const userId = Number.parseInt(req.params.id);

  if (!Number.isInteger(userId)) {
    return next(boom.create(400, 'Order Id must be an integer'));
  }
  let snippets;
  let gistLanguages = [];
  let gistSnippetMap = [];
  let gistsTitles = [];
  let gistData = {};

  axios.get(`${req.query.gistUrl}?access_token=${req.query.githubToken}`)
    .then((res) => {
      let resMap = [];
      let finalResArray = [];
      let resMapinit = [];

      for (let i = 0; i < res.data.length; i++) {
        if (Object.keys(res.data[i].files).length > 1) {
           resMap[i] = Object.keys(res.data[i].files).map((key) => {return res.data[i].files[key]});
        } else {
          let resKey = Object.keys(res.data[i].files);

          resMap[i] = res.data[i].files[resKey];
        }

        finalResArray = [].concat.apply([], resMap);
      }
      gistLanguages = finalResArray.map((gist) => { return gist.language });
      const gistsUrls = finalResArray.map((gist) => { return gist.raw_url });
      gistsTitles = finalResArray.map((gist) => { return gist.filename });
      const promiseArray = gistsUrls.map(url => axios.get(url));

      return axios.all(promiseArray);
    })
    .then((result) => {
      gistSnippetMap = result.map((snippet, index) => {

        return result[index].data;
      })

      gistData = { gistsTitles, gistLanguages, gistSnippetMap };

      return gistData;
    })
    // I took this part out on May 12 because it was giving a 500 on server
    // .then((res)=> {
    //   const promises = res.gistsTitles.map((gist, i) => {
    //     const insertSnippet = { userId, title: res.gistsTitles[i], codeSnippet: res.gistSnippetMap[i], language: res.gistLanguages[i], keywords: 'gist', notes: '' };
    //     let snippet;
    //
    //     return knex('snippets')
    //       //make it so git keyword includes git??????????????
    //       .where('title', res.gistsTitles[i])
    //       .where('keywords', 'gist')
    //       .first()
    //       .then((snippet) => {
    //         if (!snippet) {
    //           knex('snippets')
    //             .insert(decamelizeKeys(insertSnippet), '*')
    //             .then((rows) => {
    //               snippet = camelizeKeys(rows[0]);
    //               console.log(snippet);
    //               // res.send(snippet);
    //             })
    //             .catch((err) => {
    //               next(err);
    //             });
    //         }
    //       })
    //   })
    //   return Promise.all(promises);
    //
    // })



    //attempting to update snippets with null userId
    // .then(()=> {
    //   knex('snippets')
    //     .where('user_id', null)
    //     .update(decamelizeKeys('user_id', userId))
    //     .catch((err) => {
    //       next(err);
    //     });
    //   })
    .then(() => {
      knex('snippets')
        .where('user_id', userId)
        .then((row) => {
          if (!row) {
            throw boom.create(404, 'Not Found');
          }

          return camelizeKeys(row);
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
    })
    .catch((err) => {
      console.error(err);
    });
});

//used from Atom Plugin to post to database
router.post('/api-snippets', authorize, (req, res, next) => {
  console.log('got into post');
  console.log(req.body);

  const { title, codeSnippet, language, keywords, notes } = req.body;
  const { userId } = req.token;

  const insertSnippet = { userId, title, codeSnippet, language, keywords, notes };
  let snippet;

  knex('snippets')
    .insert(decamelizeKeys(insertSnippet), '*')
    .then((rows) => {
      snippet = camelizeKeys(rows[0]);
      console.log('got through knex');
      res.send(snippet);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api-snippets/atom', (req, res, next) => {
  console.log('got into post');
  console.log(req.body);

  const { title, codeSnippet, language, keywords, notes } = req.body;
  const userId = null;
  const insertSnippet = { userId, title, codeSnippet, language, keywords, notes };
  let snippet;

  knex('snippets')
    .insert(decamelizeKeys(insertSnippet), '*')
    .then((rows) => {
      snippet = camelizeKeys(rows[0]);
      console.log('got through knex');
      res.send(snippet);
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

router.delete('/api-snippets/:id', authorize, (req, res, next) => {
  console.log('got into delete');
  const snippetId = Number.parseInt(req.params.id);
  console.log(snippetId);
  if (Number.isNaN(snippetId)) {
    return next();
  }
  const clause = { id: snippetId };
  let deleteThisSnippet;

  knex('snippets')
    .where(clause)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Snippet to delete not found');
      }
      deleteThisSnippet = camelizeKeys(row);

      return knex('snippets')
        .del()
        .where('id', deleteThisSnippet.id)
    })
    .then(() => {
      delete deleteThisSnippet.id;

      res.send(deleteThisSnippet);
    })
    .catch((err) => {
      next(err);
    })
});

module.exports = router;
