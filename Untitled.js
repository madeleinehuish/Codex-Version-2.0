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
  authorizationURL: `https://github.com/login/oauth/authorize`,
  // scope: ['r_basicprofile', 'r_emailaddress'],
  scope: 'user:email',
  tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/api-oauth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  let ghprofile = null;
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
  .then(([ghprofile, emails]) => {

    ghprofile = JSON.parse(ghprofile);
    emails = JSON.parse(emails);
    // console.log(ghprofile);
    const nameSplit = ghprofile.name.split(' ');
    const firstName = nameSplit[0];
    const lastName = nameSplit[1];
    console.log(firstName);
    console.log(lastName);
    console.log(emails[0].email);

    // return knex('users')
    //   .where('github_id', ghprofile.id)
    //   .first();


    return knex('users')
      .insert(({
        first_name: firstName,
        last_name: lastName,
        email: emails[0].email,
        github_id: ghprofile.id,
        github_token: accessToken,
      }), '*');
      console.log('getting through knex flow');
    })
    .then((user) => {
      console.log(user);
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


document.getElementById('example')





Promise.all([profiledata, email])
.then(([ghprofile, emails]) => {

  ghprofile = JSON.parse(ghprofile);
  emails = JSON.parse(emails);
  // console.log(ghprofile);
  const nameSplit = ghprofile.name.split(' ');
  const firstName = nameSplit[0];
  const lastName = nameSplit[1];
  console.log(firstName);
  console.log(lastName);
  console.log(emails[0].email);

  return knex('users')
    .where('github_id', ghprofile.id)
    .first();
})
.then((user) => {
  // console.log(firstName);
  console.log(user)
  if (user) {
    return user;
  }
  console.log('no user, adding');
  return knex('users')
    .insert(({
      first_name: firstName,
      last_name: lastName,
      email: emails[0].email,
      github_id: ghprofile.id,
      github_token: accessToken,
    }), '*');
  })





  componentDidMount() {
    axios.get('/api-token')
      .then(res => {
        console.log(res.data);
        axios.get('/api-users')
          .then(res => {
            console.log(res.data);
            this.setState({ loggedIn : true, currentUser: res.data });
            console.log(this.state.currentUser);
            axios.get(`/api-snippets/${res.data.id}`)
              .then(res => {
                console.log(res.data);
                this.setState({ snippets: res.data });
                console.log(this.state.snippets.snippetsData[0].title);
                // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
              })
              .then(() => {

              })
              .catch((error) => {
                console.log(error);
              });

          })
          .catch((error) => {
            console.log(error);


      })
      .catch((error) => {
        console.log(error);
      });
    });
  },




  axios.get(`/api-snippets/${3}`)
    .then(res => {
      console.log(res.data.snippetsData);
      this.setState({ snippets: res.data.snippetsData });
      // this.setState({ snippettest: this.state.snippets.snippetsData[0].title})
      // console.log(this.state.snippets[0].title);
      // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
    })
    .catch((error) => {
      console.log(error);
    });


    componentDidMount() {

      axios.get('/api-token')
      .then(res => {
        console.log(res.data);  //getting through
        this.setState({ loggedIn : true });
        console.log(this.state.loggedIn); //working
      })
      .then(() => {
        axios.get('/api-users')
        .then(res => {
          console.log(res.data); //getting through
          this.setState({ currentUser: res.data });
          console.log(this.state.currentUser); //working
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .then(() => {
        console.log(res);
        axios.get(`/api-snippets/${res.data.id}`)
          .then(res => {
            console.log(res.data.snippetsData);
            this.setState({ snippets: res.data.snippetsData });
            // this.setState({ snippettest: this.state.snippets.snippetsData[0].title})
            console.log(this.state.snippets[0].title);
            // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    },

    onFormChange(event) {
      console.log(event.target.value)
      // console.log(this.state.title);
      console.log(this.state.snippets[this.state.currentIndex].title);
      // const snippet = this.state.snippets[this.state.currentIndex];
      // this.setState({ snippets[this.state.currentIndex].title : event.target.value });
      // this.setState( snippets[this.state.currentIndex].title : event.target.value );
      this.setState({ snippets: update(this.state.snippets, {[this.state.currentIndex]: {title: {$set: event.target.value}}})})
      // return Object.assign({}, snippets, { title: event.target.value });
    },





    //working but off by one
    patchSnippets() {
      console.log(this.state.currentIndex);
      const current = this.state.currentIndex;
      console.log(typeof current);
      // let id = (Number.parseInt(current) + 1);
      let id = current;
      // let idString = id.toString();
      console.log(id);
      // const id = this.state.currentIndex
      console.log(typeof(id));
      // const title = this.state.snippets[id].title;
      // const codeSnippet = this.state.snippets[id].codeSnippet;
      // const keywords = this.state.snippets[id].keywords;
      // const notes = this.state.snippets[id].notes;

      axios.patch(`/api-snippets/${id}`, this.state.snippets[id])
        .then((res)=> {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
