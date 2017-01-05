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

    <option value="Option 1">all titles</option>
    <option value="Option 2">Language</option>
    <option value="Option 3">Keyword</option>




    const snippetMap = this.state.snippets.map((snippet, index) => {
      if (this.state.sortValue === '' || this.state.sortValue === 'All Titles') {
        return this.state.snippets[index].title
      } else {
      return (this.state.snippets[index].keywords.includes(this.state.sortValue) || this.state.snippets[index].language.includes(this.state.sortValue));
    };
  });
    console.log(snippetMap);
    this.setState({ snippetTitles: snippetMap });
    // console.log(snippetMap);





    let languageMap = this.props.defaultSnippetArray.filter((snippet, index) => {
      // console.log(this.props.snippets[index].language);
      if (!this.props.defaultSnippetArray[index].language || this.props.defaultSnippetArray[index].language === undefined) {return}
         else{ return this.props.defaultSnippetArray[index].language === this.props.sortValue.trim()};
    });

    let uniqueLanguageMap = languageMap.filter((item, pos, self) => {
      if (item === '') {return} else {
        return self.indexOf(item) == pos;
      }
    });

    const keywordMap = this.props.defaultSnippetArray.map((snippet, index) => {
      if (this.props.snippets[index].keywords === undefined) {return}
         else{ return this.props.snippets[index].keywords };
    });

    const filteredkeyWordMap = keywordMap.filter((item, pos) => {
      return (item !== '');
    });

    let newkeywordArray = [];
    for (let i = 0; i < filteredkeyWordMap.length; i ++) {
      newkeywordArray[i] = filteredkeyWordMap[i].split(',');
    };

    var keywordArrayMerged = [].concat.apply([], newkeywordArray);

    let trimmedKeywordArray = keywordArrayMerged.map((item, index) => {
      return item.trim();
    });

    let initialsortByArray = uniqueLanguageMap.concat(trimmedKeywordArray);

    let sortByArrayUnique = initialsortByArray.filter((item, pos, self) => {
        return self.indexOf(item) == pos;
    });

    let sortByArray = sortByArrayUnique.sort();

    sortByArray.unshift('All Titles');

    let sortByArrayRender = sortByArray.map((item, index) => {
      return <Sortby
        key={index}
        value={item}
        item={item}
        handleChange={this.handleChange}
        sortValue={this.props.sortValue}
        />
    });

    return (
      <form onSubmit={this.handleSubmit}>
          <label className="titleWord">Sort By
            <select className="u-full-width " value={this.props.value} onChange={this.handleChange}>
              {sortByArrayRender}
            </select>
          </label>
          <input type="submit" value="Select" />
      </form>
    );
  }

});

export default Sortbylist;




[{
  "id": "1",
  "user_id": "1",
  "title": "Fibonacci Function",
  "code_snippet": "function fibonacci(indexNumber) {\n
if (indexNumber === 0 || indexNumber === 1) {\n
return 1;\n
} else {\n
return (fibonacci(indexNumber-1) + fibonacci(indexNumber-2));\n
}\n
}\n
\n
fibonacci();",
  "notes": "This code uses recursive functions to arrive at any Fibonacci number, given its index in the sequence.",
  "language": "JavaScript",
  "keywords": "recursive functions, fibonacci",
  "created_at": "new Date('2016-06-26 14:26:16 UTC')",
  "updated_at": "new Date('2016-06-26 14:26:16 UTC')"
}, {
  id: 2,
  user_id: 2,
  title: 'Reduce Function',
  code_snippet: `var sum = [0, 1, 2, 3].reduce(function(a, b) {
  return a + b;
  }, 0);
  // sum is 6

  var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
  }, []);
  // flattened is [0, 1, 2, 3, 4, 5]`,
  notes: '2 examples of the reduce function from MDN',
  language: 'JavaScript',
  keywords: 'summing, flattened array',
  created_at: new Date('2016-06-26 14:26:16 UTC'),
  updated_at: new Date('2016-06-26 14:26:16 UTC')
}, {
  id: 3,
  user_id: 2,
  title: 'test',
  code_snippet: 'test',
  notes: 'test',
  language: 'test',
  keywords: 'test',
  created_at: new Date('2016-06-26 14:26:16 UTC'),
  updated_at: new Date('2016-06-26 14:26:16 UTC')
}








// this code pulls all snippets
router.get(`/api-snippets/:id`, authorize, (req, res, next) => {
  const userId = Number.parseInt(req.params.id);

  if (!Number.isInteger(userId)) {
    return next(boom.create(400, 'Order Id must be an integer'));
  }
  // const  { gistUrl } = req.query.gistUrl;
  // const { githubToken } = req.query.githubToken;
  console.log(req.query.gistUrl);
  console.log(req.cookies.token);
  console.log(req.query.githubToken);
  let snippets;
  var gistLanguages = [];
  var gistSnippetMap = [];
  var gistsTitles = [];
  var gistData = {};

  axios.get(`${req.query.gistUrl}?access_token=${req.query.githubToken}`)
    .then((res) => {
      console.log('look here');
      console.log(res.data);
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
      console.log('finalResArray');
      console.log(finalResArray);
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
    .then((res)=> {

      for (let i = 0; i < res.gistsTitles.length; i++) {
        const insertSnippet = { userId, title: res.gistsTitles[i], codeSnippet: res.gistSnippetMap[i], language: res.gistLanguages[i], keywords: 'gist', notes: '' };
        let snippet;

        knex('snippets')
          .insert(decamelizeKeys(insertSnippet), '*')
          .then((rows) => {
            snippet = camelizeKeys(rows[0]);
            console.log(snippet);
            // res.send(snippet);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .then(()=> {
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



'use babel';

export default class CodexpostView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('codexpost');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The Codexpost package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}


//from file codexpost-view.js

'use babel';

import { CompositeDisposable } from 'atom';
import axios from 'axios';

export default {

  subscriptions: null,

  activate() {

    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'codexpost:fetch': () => this.fetch()
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  fetch() {
    let editor
    let self = this

    if (editor = atom.workspace.getActiveTextEditor()) {
      let selected = editor.getSelectedText()
      let language = editor.getGrammar().name
      let url = '/api-snippets'
      atom.notifications.addSuccess('Something Working!')

      self.post(selected, language, url)
        .then(() => {
          atom.notifications.addSuccess(language)
          return self.post(selected, language, url)
        })
        .then((res) => {
          console.log(res)
          atom.notifications.addSuccess('Added Snippet to Codex!')
        })
        .catch((error) => {
          atom.notifications.addWarning('huh?')
          atom.notifications.addWarning(error.reason)
        })
    }
  },

  post(selected, language, url) {
    let snippetObject = {
      title: 'atom snippet',
      codeSnippet: selected,
      language: language,
      keywords: 'atom',
      notes: ''
    }
    axios.post(url, snippetObject)
      .then((res)=> {
        console.log('posted from Atom Editor')
      })
      .catch((err) => {
        console.error(err)
      })
  }


}

'use babel';

import { CompositeDisposable } from 'atom';
import axios from 'axios';

export default {

  subscriptions: null,

  activate() {

    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'codexpost:fetch': () => this.fetch()
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  fetch() {
    let editor
    let self = this

    if (editor = atom.workspace.getActiveTextEditor()) {
      let selected = editor.getSelectedText()
      let language = editor.getGrammar().name
      let url = '/api-snippets'
      atom.notifications.addSuccess('Something Working!')

      self.post(selected, language, url)
        .then(() => {
          atom.notifications.addSuccess(language)
          return self.post(selected, language, url)
        })
        .then((res) => {
          console.log(res)
          atom.notifications.addSuccess('Added Snippet to Codex!')
        })
        .catch((error) => {
          atom.notifications.addWarning('huh?')
          atom.notifications.addWarning(error.reason)
        })
    }
  },

  post(selected, language, url) {
    atom.notifications.addSuccess('Got into post!')
    let snippetObject = {
      title: 'atom snippet',
      codeSnippet: selected,
      language: language,
      keywords: 'atom',
      notes: ''
    }
    atom.notifications.addSuccess('Got past variable declarations')
    atom.notifications.addSuccess(url)
    axios.post(url, snippetObject)
      .then((res)=> {
        atom.notifications.addSuccess('Got into axios!')
        console.log('posted from Atom Editor')
      })
      .catch((err) => {
        console.error(err)
      })
  }


}


url, snippetObject)
  .then((res)=> {
    atom.notifications.addSuccess('Got into axios!')
    resolve(body)
    console.log('posted from Atom Editor')
  })
  .catch((err) => {
    reject({ reason: 'Unable to access'})
    console.error(err)
  })


  // .then((res) => {
  //   atom.notifications.addSuccess('Successful Post with Axios!')
  //   resolve(body)
  // })
  // .catch((err) =>{
  //   if (err) {
  //     reject({
  //       reason: 'Unable to post'
  //     })
  //   }
  // })

// request.post({ url:'http://localhost:8000/api-snippets', formData: formData }, (error, response, body) => {
