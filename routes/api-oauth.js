'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request-promise');
var axios = require('axios');
var _ = require('lodash');
// var assert = require('assert');
// var values = require('object.values');

const router = express.Router();

const strategy = new OAuth2Strategy({
  authorizationURL: `https://github.com/login/oauth/authorize`,
  // scope: ['r_basicprofile', 'r_emailaddress'],
  scope: ['user:email', 'gist'],
  // redirect_url: 'http://localhost:8000/main',
  tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/api-oauth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  let ghprofile = null;
  let emails = null;
  console.log(accessToken);

  const profiledata = request({
    url: `https://api.github.com/user?access_token=${accessToken}`,
    headers: {
      'User-Agent': 'Maddie Server'
    }
  });

  const email = request({
    url: `https://api.github.com/user/emails?access_token=${accessToken}`,
    headers: {
      'User-Agent': 'Maddie Server'
    }
  });



  Promise.all([profiledata, email])
  .then(([githubprofile, githubemails]) => {
    ghprofile = JSON.parse(githubprofile);
    emails = JSON.parse(githubemails);

    return knex('users')
            .where('github_id', ghprofile.id)
            .first()
  })
  .then((user) => {
    const nameSplit = ghprofile.name.split(' ');
    const firstName = nameSplit[0];
    const lastName = nameSplit[1];
    const gistUrl = ghprofile.gists_url.replace('{/gist_id}', '');
    // let gistLanguages = [];
    // let gistSnippetMap = [];
    // // let gistData = {};
    // axios.get(`${gistUrl}?access_token=${accessToken}`)
    //   .then((res) => {
    //     let resMap = [];
    //     let finalResArray = [];
    //     let resMapinit = [];
    //
    //     for (let i = 0; i < res.data.length; i++) {
    //       if (Object.keys(res.data[i].files).length > 1) {
    //          resMap[i] = Object.keys(res.data[i].files).map((key) => {return res.data[i].files[key]});
    //       } else {
    //         let resKey = Object.keys(res.data[i].files);
    //
    //         resMap[i] = res.data[i].files[resKey];
    //       }
    //
    //       finalResArray = [].concat.apply([], resMap);
    //     }
    //
    //     gistLanguages = finalResArray.map((gist) => { return gist.language});
    //     const gistsUrls = finalResArray.map((gist) => { return gist.raw_url});
    //     const promiseArray = gistsUrls.map(url => axios.get(url));
    //
    //     return axios.all(promiseArray);
    //   })
    //   .then((result) => {
    //     gistSnippetMap = result.map((snippet, index) => {
    //       return result[index].data;
    //     })
    //     console.log('inside');
    //     console.log(gistLanguages);
    //     console.log(gistSnippetMap);
    //     // gistData = { gistLanguages, gistSnippetMap };
    //     // return gistData;
    //   })
    //   .catch((err) => {
    //     done(err);
    //   });
    // console.log('outside');
    // console.log(gistLanguages);
    // console.log(gistSnippetMap);
    if (user) {
      console.log('Updating');
      console.log(accessToken);
      console.log(user.id);
      return knex('users')
        .update({
          github_token: accessToken
        }, '*')
        .where('id', user.id);
    }
    return knex('users')
      .insert([{
        first_name: firstName,
        last_name: lastName,
        email: emails[0].email,
        gist_url: gistUrl,
        github_id: ghprofile.id,
        github_token: accessToken,
      }], '*');
    })
    .then((users) => {
      const user = users[0];

      // console.log(user);
      done(null, Object.assign(camelizeKeys(user), { githubToken: accessToken }));
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(strategy);

router.get('/github', passport.authenticate('oauth2', { session: false }));

router.get('/github/callback', passport.authenticate('oauth2', {
  session: false,
  failureRedirect: '/'
}), (req, res) => {
  // console.log(req.user);
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3); // 3 hours
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: '3h'
  });

  res.cookie('token', token, {
    httpOnly: true,
    expires: expiry,
    secure: router.get('env') === 'production'
  });

  // Successful authentication, redirect home.
  res.redirect('/main');
});

module.exports = router;
