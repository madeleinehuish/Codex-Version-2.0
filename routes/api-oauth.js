'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request-promise')

const router = express.Router();

const strategy = new OAuth2Strategy({
  authorizationURL: 'https://github.com/login/oauth/authorize',
  scope: ['r_basicprofile', 'r_emailaddress'],
  tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/oauth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  let githubProfile = null;

  request({
    url: 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address)?format=json',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then((githubProfile) => {
    githubProfile = JSON.parse(githubProfile)

    return knex('users')
      .where('github_Id', githubProfile.id)
      .first();
  })
  .then((user) => {
    if (user) {
      return user;
    }

    return knex('users')
      .insert(decamelizeKeys({
        firstName: githubProfile.firstName,
        lastName: githubProfile.lastName,
        email: githubProfile.emailAddress,
        github_Id: githubProfile.id,
        github_token: accessToken,
      }), '*');
    })
    .then((user) => {
      done(null, camelizeKeys(user));
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
  console.log(req.user);
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
  res.redirect('/');
});

module.exports = router;
