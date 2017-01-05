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

const router = express.Router();

const strategy = new OAuth2Strategy({
  authorizationURL: `https://github.com/login/oauth/authorize`,
  scope: ['user:email', 'gist'],
  tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'https://madeleinehuish-codex.herokuapp.com/api-oauth/github/callback'
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
    console.log(ghprofile);
    return knex('users')
            .where('github_id', ghprofile.id)
            .first()
  })
  .then((user) => {
    const nameSplit = ghprofile.name.split(' ');
    const firstName = nameSplit[0];
    const lastName = nameSplit[1];
    const gistUrl = ghprofile.gists_url.replace('{/gist_id}', '');
    const avatar = ghprofile.avatar_url;

    if (user) {

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
        avatar: ghprofile.avatar_url
      }], '*');
    })
    .then((users) => {
      const user = users[0];

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
