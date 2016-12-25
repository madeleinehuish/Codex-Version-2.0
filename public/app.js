(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Header = require('./layouts/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App = _react2.default.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {
    return {
      value: '',
      inputValue: '',
      searchVisible: false,
      formComplete: false,
      snippets: {},
      snippettest: [],
      // searchArray: [],
      // sortType: '',
      loggedIn: false,
      currentUser: {},
      // email: '',
      // firstName: '',
      // lastName: '',
      testCode: 'function fibonacci(indexNumber) {\nif (indexNumber === 0 || indexNumber === 1) {\nreturn 1;\n} else {\nreturn (fibonacci(indexNumber-1) + fibonacci(indexNumber-2));\n}\n}\n\nfibonacci();',
      newTestCodeValue: ''
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    _axios2.default.get('/api-token').then(function (res) {
      console.log(res.data);
      _axios2.default.get('/api-users').then(function (res) {
        console.log(res.data);
        _this.setState({ loggedIn: true, currentUser: res.data });
        console.log(_this.state.currentUser);
        _axios2.default.get('/api-snippets/' + res.data.id).then(function (res) {
          console.log(res.data);
          _this.setState({ snippets: res.data });
          _this.setState({ snippettest: _this.state.snippets.snippetsData[0].title });
          console.log(_this.state.snippets.snippetsData[0].title);
          // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
        }).then(function () {}).catch(function (error) {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
      }).catch(function (error) {
        console.log(error);
      });
    });
  },


  // console.log(res.data);
  // axios.get('/api-users')
  //   .then(res => {
  //
  //
  //   })
  //   .catch((error) => {
  //     console.log(error);
  // }),


  //
  // console.log(res.data);
  // this.setState({ loggedIn : true, currentUser: res.data });
  // console.log(this.state.currentUser);
  // axios.get(`/api-snippets/${res.data.id}`)
  //   .then(res => {
  //     console.log(res.data);
  //     this.setState({ snippets: res.data });
  //     console.log(this.state.snippets.snippetsData[0].title);
  //     // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
  //   })
  //   .then(() => {
  //
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });


  // logIn(user) {
  //
  //   axios.post('/api-token')
  //     .then((res) => {
  //       sessionStorage.setItem('userId', res.data.id);
  //       this.setState({ loggedIn : true, currentUser: res.data });
  //       console.log(this.state.currentUser);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //
  // },

  logOut: function logOut() {
    this.setState({
      loggedIn: false,
      currentUser: {},
      previousOrders: {}
    });
  },
  onFormChange: function onFormChange(event) {
    this.setState(_defineProperty({}, event.target.name, event.target.value));
    if (this.state.loggedIn) {
      this.setState({ email: this.state.currentUser.email });
    };

    var incompleteForm = this.state.firstName === '' || this.state.lastName === '' || this.state.address1 === '' || this.state.city === '' || this.state.zip === '' || this.state.email === '';

    this.setState({ formComplete: !incompleteForm });
  },


  // onSubmitGitHubLogIn() {
  //   axios.get('/api-oauth/github')
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((res) => {
  //       if(res instanceof Error) {
  //         console.log(res.message);
  //       } else {
  //         console.log(res.data);
  //       }
  //     });
  // },

  changeEditor: function changeEditor(newValue) {
    this.setState({ newTestCodeValue: newValue });
    console.log(this.state.newTestCodeValue);
  },
  render: function render() {
    var _this2 = this;

    // console.log(this.state.snippets.snippetsData[0].title);
    return _react2.default.createElement(
      _reactRouter.BrowserRouter,
      null,
      _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(_reactRouter.Match, { pattern: '/', exactly: true, render: function render() {
            return _react2.default.createElement(_Home2.default, _extends({}, _this2.state, {
              onSubmitGitHubLogIn: _this2.onSubmitGitHubLogIn
            }));
          } }),
        _react2.default.createElement(_reactRouter.Match, { pattern: '/editor', exactly: true, render: function render() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Header2.default, _extends({}, _this2.state, {
                logIn: _this2.logIn,
                logOut: _this2.logOut,
                onSubmit: _this2.onSubmit,
                onFormChange: _this2.onFormChange
              })),
              _react2.default.createElement(_Editor2.default, _extends({}, _this2.state, {
                changeEditor: _this2.changeEditor
              }))
            );
          } }),
        _react2.default.createElement(_reactRouter.Match, { pattern: '/main', exactly: true, render: function render() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Header2.default, _extends({}, _this2.state, {
                logIn: _this2.logIn,
                logOut: _this2.logOut,
                onSubmit: _this2.onSubmit,
                onFormChange: _this2.onFormChange
              })),
              _react2.default.createElement(_Main2.default, _this2.state)
            );
          } })
      )
    );
  }
});

exports.default = App;
});

require.register("components/Editor.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _brace = require('brace');

var _brace2 = _interopRequireDefault(_brace);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

require('brace/mode/javascript');

require('brace/theme/github');

require('brace/theme/monokai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = _react2.default.createClass({
  displayName: 'Editor',


  // componentDidMount() {
  //   axios.get('/api-snippets/1')
  //     .then(res => {
  //       console.log(res.data);
  //       console.log(res.data.snippetsData[0].codeSnippet);
  //       // this.setState({ products: res.data, defaultProducts: res.data, sortArray: res.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },


  onChange: function onChange(newValue) {
    console.log('change', newValue);
    // this.props.changeEditor(newValue);
  },
  render: function render() {
    return _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'div',
        { className: 'offset-by-one four columns' },
        _react2.default.createElement(
          'h4',
          { id: 'titleWord' },
          'Code Editor Test'
        ),
        _react2.default.createElement(
          'div',
          { id: 'trythis' },
          _react2.default.createElement(_reactAce2.default, {
            mode: 'javascript',
            theme: 'monokai'
            // theme="github"
            , onChange: this.onChange,
            name: 'trythis',
            value: this.props.testCode,
            editorProps: { $blockScrolling: true }
          })
        )
      )
    );
  }
});

exports.default = Editor;
});

require.register("components/Home.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = _react2.default.createClass({
  displayName: 'Home',
  onClickSubmit: function onClickSubmit(event) {
    this.props.onSubmitGitHubLogIn();
  },
  render: function render() {
    return _react2.default.createElement(
      'section',
      { id: 'home' },
      _react2.default.createElement(
        'div',
        { id: 'hero' },
        _react2.default.createElement(
          'h1',
          { id: 'titleWord' },
          'Codex'
        ),
        _react2.default.createElement(
          'a',
          { className: 'mainTitle', href: '/api-oauth/github' },
          'Sign in with GitHub'
        )
      )
    );
  }
});

exports.default = Home;
});

require.register("components/Main.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Snippetslist = require('./Snippetslist');

var _Snippetslist2 = _interopRequireDefault(_Snippetslist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _react2.default.createClass({
  displayName: 'Main',


  // componentDidMount() {
  //   axios.get(`/api-snippets/${this.props.currentUser.id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       console.log(res.data.snippetsData[0].codeSnippet);
  //       this.setState({ snippets: res.data });
  //       console.log(this.state.snippets);
  //       // this.setState({ snippets: res.data, defaultProducts: res.data, sortArray: res.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },

  render: function render() {
    console.log(Array.isArray(this.props.snippets.snippetsData));
    return _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'div',
        { className: 'offset-by-one eight columns' },
        _react2.default.createElement(
          'h4',
          { id: 'titleWord' },
          this.props.currentUser.firstName,
          '\'s Code Library'
        ),
        'main',
        _react2.default.createElement(_Snippetslist2.default, this.state),
        _react2.default.createElement('p', null)
      )
    );
  }
});

exports.default = Main;
});

require.register("components/Snippets.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Snippets = _react2.default.createClass({
  displayName: 'Snippets',
  render: function render() {
    return _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'div',
        { className: 'four columns' },
        _react2.default.createElement(
          'div',
          null,
          'snippet'
        )
      )
    );
  }
});

exports.default = Snippets;
});

require.register("components/Snippetslist.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Snippets = require('./Snippets');

var _Snippets2 = _interopRequireDefault(_Snippets);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Snippetslist = _react2.default.createClass({
  displayName: 'Snippetslist',
  handleClick: function handleClick() {
    this.props.displaySearch();
  },
  handleSortType: function handleSortType(event) {
    var sortValue = event.target.name;

    this.props.handleSort(sortValue);
  },
  render: function render() {

    return _react2.default.createElement(
      'div',
      null,
      'snippetslist'
    );
  }
});

exports.default = Snippetslist;
});

require.register("components/layouts/Header.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _react2.default.createClass({
  displayName: 'Header',
  logOut: function logOut() {
    this.props.logOut();
  },
  onClickSubmit: function onClickSubmit(event) {
    this.props.onSubmit();
  },
  render: function render() {
    return _react2.default.createElement(
      'header',
      null,
      _react2.default.createElement(
        'div',
        { className: 'twelve columns' },
        _react2.default.createElement(
          'div',
          { className: 'six columns', id: 'logo' },
          _react2.default.createElement(
            'h5',
            { id: 'logoWord' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/' },
              'Codex'
            )
          )
        ),
        _react2.default.createElement(
          'nav',
          { className: 'six columns' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { key: this.props.currentUser.id, id: 'userNav' },
              this.props.currentUser.firstName
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/main' },
                'Main'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/editor' },
                'Editor'
              )
            )
          )
        )
      )
    );
  }
});

exports.default = Header;
});

require.register("index.jsx", function(exports, require, module) {
'use strict';

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('app'));
});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map