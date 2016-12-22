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
      signupFirstName: '',
      signupLastName: '',
      searchVisible: false,
      formComplete: false,
      signupEmail: '',
      signupPassword: '',
      cartItems: [],
      cartItemQty: false,
      products: [],
      defaultProducts: [],
      searchArray: [],
      sortType: '',
      loggedIn: false,
      currentUser: {},
      previousOrders: {},
      userInformation: [],
      email: '',
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    };
  },
  logIn: function logIn(user) {
    var _this = this;

    var email = this.state.signupEmail;
    var password = this.state.signupPassword;

    if (!email) {
      alert('Email must not be blank');
    }
    if (!password) {
      alert('Password must not be blank');
    }

    _axios2.default.post('/api-token', { email: email, password: password }).then(function (res) {
      sessionStorage.setItem('userId', res.data.id);
      _this.setState({ loggedIn: true, currentUser: res.data });
    }).then(function () {
      _axios2.default.get('/api-orders/' + _this.state.currentUser.id).then(function (res) {
        var sortedOrders = res.data.sortedOrderItems;

        _this.setState({ previousOrders: sortedOrders });
      }).catch(function (error) {
        console.log(error);
      });
    }).then(function () {
      _axios2.default.get('api-orders/').then(function (res) {}).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  },
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
  onSubmit: function onSubmit(event) {
    var _this2 = this;

    var firstName = this.state.signupFirstName;
    var lastName = this.state.signupLastName;
    var email = this.state.signupEmail;
    var password = this.state.signupPassword;

    if (!firstName) {
      alert('First name must not be blank');
    }
    if (!lastName) {
      alert('Last name must not be blank');
    }
    if (!email) {
      alert('Email must not be blank.');
    }
    if (email.indexOf('@') < 0) {
      alert('Email must be valid.');
    }
    if (!password || password.length < 8) {
      alert('Password must be valid.');
    }

    _axios2.default.post('/api-users', { firstName: firstName, lastName: lastName, email: email, password: password }).then(function (response) {
      _axios2.default.post('/api-token', { email: email, password: password }).then(function (res) {
        sessionStorage.setItem('userId', res.data.id);
        _this2.setState({ loggedIn: true, currentUser: res.data });
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
      console.log(error);
    });
  },
  onSubmitGitHubLogIn: function onSubmitGitHubLogIn() {
    _axios2.default.get('/api-oauth/github').then(function (response) {
      console.log(response.data);
    }).catch(function (res) {
      if (res instanceof Error) {
        console.log(res.message);
      } else {
        console.log(res.data);
      }
    });
  },
  render: function render() {
    var _this3 = this;

    return (
      // <div>Hello World</div>
      _react2.default.createElement(
        _reactRouter.BrowserRouter,
        null,
        _react2.default.createElement(
          'main',
          null,
          _react2.default.createElement(_Header2.default, _extends({}, this.state, {
            logIn: this.logIn,
            logOut: this.logOut,
            onSubmit: this.onSubmit,
            onFormChange: this.onFormChange
          })),
          _react2.default.createElement(_reactRouter.Match, { pattern: '/', exactly: true, render: function render() {
              return _react2.default.createElement(_Home2.default, _extends({}, _this3.state, {
                onSubmitGitHubLogIn: _this3.onSubmitGitHubLogIn
              }));
            } }),
          _react2.default.createElement(_reactRouter.Match, { pattern: '/main', exactly: true, render: function render() {
              return _react2.default.createElement(_Main2.default, _this3.state);
            } })
        )
      )
    );
  }
});

exports.default = App;
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
          'h2',
          { className: 'mainTitle' },
          'Codex'
        ),
        _react2.default.createElement(
          'div',
          { className: 'twelve columns' },
          _react2.default.createElement(
            'button',
            { className: 'mainTitle', onClick: this.onClickSubmit },
            'SIGN IN'
          )
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

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _react2.default.createClass({
  displayName: 'Main',
  render: function render() {
    return _react2.default.createElement(
      'section',
      { id: 'home' },
      _react2.default.createElement(
        'div',
        { id: 'hero' },
        _react2.default.createElement(
          'h2',
          { className: 'mainTitle' },
          'Main'
        ),
        _react2.default.createElement('div', { className: 'twelve columns' })
      )
    );
  }
});

exports.default = Main;
});

require.register("components/layouts/Header.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
              { id: 'products' },
              _react2.default.createElement(
                'a',
                { href: '/api-oauth/github' },
                'GitHub'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/main' },
                'Main'
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