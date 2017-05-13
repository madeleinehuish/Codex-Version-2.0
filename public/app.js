(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

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
    var hot = hmr && hmr.createHot(name);
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
    if (bundle && typeof bundle === 'object') {
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
var global = typeof window === 'undefined' ? this : window;
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
require.register("components/Addsnippet.js", function(exports, require, module) {
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

var onChange = function onChange(newValue) {
  console.log('change', newValue);
  undefined.props.onEditorChangeAddSnippet(newValue);
};

var Addsnippet = function Addsnippet(props) {

  if (props.snippets.length === 0) {
    return _react2.default.createElement('section', null);
  }

  var newIndex = props.currentIndex;
  var current = props.snippets[newIndex];

  return _react2.default.createElement(
    'section',
    null,
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'div',
            { className: 'four columns' },
            _react2.default.createElement(
              'h4',
              { className: 'titleWord' },
              'Add New Snippet'
            ),
            _react2.default.createElement(
              'div',
              { id: 'codeSnippet' },
              _react2.default.createElement(_reactAce2.default, {
                mode: 'javascript',
                theme: 'monokai',
                onChange: undefined.onChange,
                name: 'codeSnippet',
                value: props.addSnippet.codeSnippet,
                editorProps: { $blockScrolling: true }
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'offset-by-four four columns titleWord2' },
            _react2.default.createElement(
              'div',
              null,
              'Title:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'title', name: 'title', type: 'text', onChange: props.onFormChangeAddSnippet, value: props.addSnippet.title, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              null,
              'Language:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'language', name: 'language', type: 'text', onChange: props.onFormChangeAddSnippet, value: props.addSnippet.language, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              null,
              'Keywords:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'keywords', name: 'keywords', type: 'text', onChange: props.onFormChangeAddSnippet, value: props.addSnippet.keywords, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              null,
              'Notes:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'notes', name: 'notes', type: 'text', onChange: props.onFormChangeAddSnippet, value: props.addSnippet.notes, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/main' },
              _react2.default.createElement(
                'button',
                { onClick: props.addNewSnippetToStateAndDB },
                'Save Snippet'
              )
            )
          )
        )
      )
    )
  );
};

exports.default = Addsnippet;

});

require.register("components/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _Header = require('./layouts/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Home = require('./Home');

var _Home2 = _interopRequireDefault(_Home);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _Addsnippet = require('./Addsnippet');

var _Addsnippet2 = _interopRequireDefault(_Addsnippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      value: '',
      sortValue: 'All Titles',
      inputValue: '',
      addSnippet: {
        title: '',
        codeSnippet: '',
        language: '',
        keywords: '',
        notes: '',
        userId: null
      },
      defaultSnippet: {
        title: '',
        codeSnippet: '',
        language: '',
        keywords: '',
        notes: '',
        userId: null
      },
      defaultTrue: false,
      searchVisible: false,
      formComplete: false,
      renderByLanguage: false,
      snippets: [],
      defaultSnippetArray: [],
      snippetTitles: [],
      currentIndex: 0,
      loggedIn: false,
      currentUser: {},
      title: ''
    };

    _this.addNewSnippetButton = _this.addNewSnippetButton.bind(_this);
    _this.addNewSnippetToStateAndDB = _this.addNewSnippetToStateAndDB.bind(_this);
    _this.changeCurrentIndex = _this.changeCurrentIndex.bind(_this);
    _this.changeEditor = _this.changeEditor.bind(_this);
    _this.deleteSnippet = _this.deleteSnippet.bind(_this);
    _this.logOut = _this.logOut.bind(_this);
    _this.onEditorChange = _this.onEditorChange.bind(_this);
    _this.onEditorChangeAddSnippet = _this.onEditorChangeAddSnippet.bind(_this);
    _this.onFormChange = _this.onFormChange.bind(_this);
    _this.onFormChangeAddSnippet = _this.onFormChangeAddSnippet.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    _this.handleSort = _this.handleSort.bind(_this);
    _this.sortedValues = _this.sortedValues.bind(_this);
    _this.patchSnippets = _this.patchSnippets.bind(_this);
    _this.reRenderButton = _this.reRenderButton.bind(_this);
    // this.render = this.render.bind(this);
    return _this;
  }

  _createClass(App, [{
    key: 'addNewSnippetButton',
    value: function addNewSnippetButton() {
      var newIndex = this.state.snippetTitles.length;
    }
  }, {
    key: 'addNewSnippetToStateAndDB',
    value: function addNewSnippetToStateAndDB() {
      var _this2 = this;

      _axios2.default.post('/api-snippets', this.state.addSnippet).then(function (res) {
        var addSnippet = res.data;
        _this2.setState({
          snippets: _this2.state.snippets.concat([addSnippet]),
          defaultSnippetArray: _this2.state.defaultSnippetArray.concat([addSnippet]),
          addSnippet: _this2.state.defaultSnippet
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'changeCurrentIndex',
    value: function changeCurrentIndex(newIndex) {
      var _this3 = this;

      this.setState({ currentIndex: newIndex }, function () {
        console.log(_this3.state.currentIndex);
      });
    }
  }, {
    key: 'changeEditor',
    value: function changeEditor(newValue) {
      this.setState({ newTestCodeValue: newValue });
      console.log(this.state.newTestCodeValue);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      _axios2.default.get('/api-token').then(function (res) {
        _this4.setState({ loggedIn: true });
      }).then(function () {

        return _axios2.default.get('/api-users');
      }).then(function (res) {
        _this4.setState({ currentUser: res.data });

        return res;
      }).then(function (res) {
        var id = res.data.id;

        return _axios2.default.get('/api-snippets/' + id + '?gistUrl=' + _this4.state.currentUser.gistUrl + '&githubToken=' + _this4.state.currentUser.githubToken);
      }).then(function (res) {
        var snippetData = res.data.snippetsData;

        _this4.setState({ snippets: snippetData, defaultSnippetArray: snippetData });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'deleteSnippet',
    value: function deleteSnippet() {
      var _this5 = this;

      var current = this.state.snippets[this.state.currentIndex];
      var id = current.id;

      _axios2.default.delete('/api-snippets/' + id).then(function (res) {
        var delSnippet = res.data;

        _this5.setState({
          defaultSnippetArray: (0, _immutabilityHelper2.default)(_this5.state.defaultSnippetArray, { $splice: [[_this5.state.currentIndex, 1]] }),
          snippets: (0, _immutabilityHelper2.default)(_this5.state.snippets, { $splice: [[_this5.state.currentIndex, 1]] })

        });
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      this.setState({
        loggedIn: false,
        currentUser: {},
        previousOrders: {}
      });
    }
  }, {
    key: 'onEditorChange',
    value: function onEditorChange(newValue) {
      this.setState({ snippets: (0, _immutabilityHelper2.default)(this.state.snippets, _defineProperty({}, this.state.currentIndex, { codeSnippet: { $set: newValue } })) });
    }
  }, {
    key: 'onEditorChangeAddSnippet',
    value: function onEditorChangeAddSnippet(newValue) {
      this.setState({ addSnippet: (0, _immutabilityHelper2.default)(this.state.addSnippet, { codeSnippet: { $set: newValue } }) });
      this.setState({ addSnippet: (0, _immutabilityHelper2.default)(this.state.addSnippet, { userId: { $set: this.state.currentUser.id } }) });
    }
  }, {
    key: 'onFormChange',
    value: function onFormChange(event) {
      this.setState({ snippets: (0, _immutabilityHelper2.default)(this.state.snippets, _defineProperty({}, this.state.currentIndex, _defineProperty({}, event.target.name, { $set: event.target.value }))) });
      this.setState({ defaultSnippetArray: (0, _immutabilityHelper2.default)(this.state.defaultSnippetArray, _defineProperty({}, this.state.currentIndex, _defineProperty({}, event.target.name, { $set: event.target.value }))) });
    }
  }, {
    key: 'onFormChangeAddSnippet',
    value: function onFormChangeAddSnippet(event) {
      this.setState({ addSnippet: (0, _immutabilityHelper2.default)(this.state.addSnippet, _defineProperty({}, event.target.name, { $set: event.target.value })) });
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(event) {
      var _this6 = this;

      var search = event.target.value;
      this.setState({ value: search }, function () {
        return _this6.sortedValues();
      });
    }
  }, {
    key: 'handleSort',
    value: function handleSort(event) {
      var _this7 = this;

      var sort = event.target.value;
      this.setState({ sortValue: sort }, function () {
        return _this7.sortedValues();
      });
    }
  }, {
    key: 'sortedValues',
    value: function sortedValues() {
      var sortValue = this.state.sortValue;
      var searchValue = this.state.value;
      var render = void 0;
      console.log('sortValue =' + sortValue);
      console.log('searchValue =' + searchValue);

      //if searchValue empty and sortValue empty
      if (searchValue === '' && sortValue === 'All Titles') {
        render = this.state.defaultSnippetArray;
        return this.setState({ snippets: render });
      } else
        //if searchValue empty and sortValue filled
        if (searchValue === '' && sortValue !== 'All Titles') {
          render = this.state.defaultSnippetArray.filter(function (element, index) {
            if (element.language.includes(sortValue)) {
              return element.language.includes(sortValue);
            } else if (element.keywords.includes(sortValue)) {
              return element.keywords.includes(sortValue);
            }
          });
          return this.setState({ snippets: render });
        } else
          //if searchValue filled and sortValue empty
          if (searchValue !== '' && sortValue === 'All Titles') {
            render = this.state.defaultSnippetArray.filter(function (element, index) {
              if (element.title.toUpperCase().includes(searchValue.toUpperCase())) {

                return true;
              }
            });
            return this.setState({ snippets: render });
          } else
            //if searchValue filled and sortValue filled
            if (searchValue !== '' && sortValue !== 'All Titles') {
              render = this.state.defaultSnippetArray.filter(function (element, index) {
                if (element.title.toUpperCase().includes(searchValue.toUpperCase())) {
                  if (element.language.includes(sortValue)) {
                    return true;
                  }
                  if (element.keywords.includes(sortValue)) {
                    return true;
                  }
                }

                return false;
              });
              return this.setState({ snippets: render });
            }
    }
  }, {
    key: 'patchSnippets',
    value: function patchSnippets() {
      var _this8 = this;

      var current = this.state.snippets[this.state.currentIndex];
      var id = current.id;

      _axios2.default.patch('/api-snippets/' + id, this.state.snippets[this.state.currentIndex]).then(function (res) {
        console.log(res);
        // this.setState({ snippets: update(this.state.snippets, {name: {$set: current}} ) });
        _this8.setState({ snippets: (0, _immutabilityHelper2.default)(_this8.state.snippets, _defineProperty({}, _this8.state.currentIndex, { $set: current })) });
        _this8.setState({ defaultSnippetArray: (0, _immutabilityHelper2.default)(_this8.state.defaultSnippetArray, _defineProperty({}, _this8.state.currentIndex, { $set: current })) });
        console.log(res.data);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'reRenderButton',
    value: function reRenderButton() {
      console.log('rerender');
      this.setState({ renderByLanguage: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      return (
        // <div>Hello world</div>
        _react2.default.createElement(
          _reactRouterDom.BrowserRouter,
          null,
          _react2.default.createElement(
            'main',
            null,
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', exactly: true, render: function render() {
                return _react2.default.createElement(_Home2.default, _extends({}, _this9.state, {
                  onSubmitGitHubLogIn: _this9.onSubmitGitHubLogIn
                }));
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/addsnippet', exactly: true, render: function render() {
                return _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(_Header2.default, _extends({}, _this9.state, {
                    logIn: _this9.logIn,
                    logOut: _this9.logOut,
                    onSubmit: _this9.onSubmit,
                    onFormChange: _this9.onFormChange
                  })),
                  _react2.default.createElement(_Addsnippet2.default, _extends({}, _this9.state, {
                    addNewSnippetToStateAndDB: _this9.addNewSnippetToStateAndDB,
                    changeEditor: _this9.changeEditor,
                    currentIndex: _this9.state.currentIndex,
                    snippets: _this9.state.snippets,
                    onFormChangeAddSnippet: _this9.onFormChangeAddSnippet,
                    onEditorChangeAddSnippet: _this9.onEditorChangeAddSnippet,
                    patchSnippets: _this9.patchSnippets
                  }))
                );
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/editor', exactly: true, render: function render() {
                return _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(_Header2.default, _extends({}, _this9.state, {
                    logIn: _this9.logIn,
                    logOut: _this9.logOut,
                    onSubmit: _this9.onSubmit,
                    onFormChange: _this9.onFormChange
                  })),
                  _react2.default.createElement(_Editor2.default, _extends({}, _this9.state, {
                    changeEditor: _this9.changeEditor,
                    currentIndex: _this9.state.currentIndex,
                    snippets: _this9.state.snippets,
                    onFormChange: _this9.onFormChange,
                    onEditorChange: _this9.onEditorChange,
                    patchSnippets: _this9.patchSnippets,
                    deleteSnippet: _this9.deleteSnippet
                  }))
                );
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/main', exactly: true, render: function render() {
                return _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(_Header2.default, _extends({}, _this9.state, {
                    logIn: _this9.logIn,
                    logOut: _this9.logOut,
                    onSubmit: _this9.onSubmit,
                    onFormChange: _this9.onFormChange
                  })),
                  _react2.default.createElement(_Main2.default, _extends({}, _this9.state, {
                    loggedIn: _this9.state.loggedIn,
                    currentUser: _this9.state.currentUser,
                    snippets: _this9.state.snippets,
                    currentIndex: _this9.state.currentIndex,
                    changeCurrentIndex: _this9.changeCurrentIndex,
                    addNewSnippetButton: _this9.addNewSnippetButton,
                    reRenderButton: _this9.reRenderButton,
                    onSortChange: _this9.onSortChange,
                    handleSort: _this9.handleSort,
                    handleSearch: _this9.handleSearch
                  }))
                );
              } })
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

});

require.register("components/Editor.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRouterDom = require('react-router-dom');

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

var Editor = function Editor(props) {

  if (props.snippets.length === 0) {
    return _react2.default.createElement('section', null);
  }
  var newIndex = 1;
  var current = props.snippets[newIndex];

  return _react2.default.createElement(
    'section',
    null,
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'div',
            { className: 'four columns' },
            _react2.default.createElement(
              'h5',
              { className: 'titleWord' },
              props.snippets[props.currentIndex].title
            ),
            _react2.default.createElement(
              'div',
              { id: 'codeSnippet' },
              _react2.default.createElement(_reactAce2.default, {
                mode: 'javascript',
                theme: 'monokai'
                // id="aceEditor"
                // theme="github"
                , onChange: props.onEditorChange,
                name: 'codeSnippet',
                value: props.snippets[props.currentIndex].codeSnippet,
                editorProps: { $blockScrolling: true }
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'offset-by-four four columns titleWord2' },
            _react2.default.createElement(
              'div',
              null,
              'Title:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'title', name: 'title', type: 'text', onChange: props.onFormChange, value: props.snippets[props.currentIndex].title, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              null,
              'Language:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'language', name: 'language', type: 'text', onChange: props.onFormChange, value: props.snippets[props.currentIndex].language, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              null,
              'Keywords:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'keywords', name: 'keywords', type: 'text', onChange: props.onFormChange, value: props.snippets[props.currentIndex].keywords, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              null,
              'Notes:',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { id: 'notes', name: 'notes', type: 'text', onChange: props.onFormChange, value: props.snippets[props.currentIndex].notes, className: 'validate' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/main' },
              _react2.default.createElement(
                'button',
                { onClick: props.patchSnippets },
                'Save To Codex'
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/main' },
              _react2.default.createElement(
                'button',
                { onClick: props.deleteSnippet },
                'Delete'
              )
            )
          )
        )
      )
    )
  );
};

exports.default = Editor;

});

require.register("components/Home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onClickSubmit = function onClickSubmit(event) {
  undefined.props.onSubmitGitHubLogIn();
};

var Home = function Home(props) {

  return _react2.default.createElement(
    "section",
    { id: "home" },
    _react2.default.createElement(
      "div",
      { id: "hero" },
      _react2.default.createElement(
        "h1",
        { className: "mainTitleWord" },
        "Codex"
      ),
      _react2.default.createElement(
        "a",
        { className: "mainTitle", href: "/api-oauth/github" },
        "Sign in with GitHub"
      )
    )
  );
};

exports.default = Home;

});

require.register("components/Main.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Snippetslist = require('./Snippetslist');

var _Snippetslist2 = _interopRequireDefault(_Snippetslist);

var _Addsnippet = require('./Addsnippet');

var _Addsnippet2 = _interopRequireDefault(_Addsnippet);

var _Sortbylist = require('./Sortbylist');

var _Sortbylist2 = _interopRequireDefault(_Sortbylist);

var _SearchBox = require('./SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main(props) {

  return _react2.default.createElement(
    'section',
    null,
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'offset-by-one seven columns' },
          _react2.default.createElement(
            'h5',
            { className: 'titleWord' },
            props.sortValue
          ),
          _react2.default.createElement(_Snippetslist2.default, {
            snippets: props.snippets,
            snippetTitles: props.snippetTitles,
            currentIndex: props.currentIndex,
            changeCurrentIndex: props.changeCurrentIndex
          }),
          _react2.default.createElement('p', null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'four columns' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/addsnippet' },
            _react2.default.createElement(
              'button',
              { className: 'titleWord', id: 'addSnippetButton', onClick: props.addNewSnippetButton },
              'Add New Snippet'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(_Sortbylist2.default, {
            snippets: props.snippets,
            sortValue: props.sortValue,
            onSortChange: props.onSortChange,
            handleSort: props.handleSort,
            defaultSnippetArray: props.defaultSnippetArray
          }),
          _react2.default.createElement(_SearchBox2.default, {
            handleSearch: props.handleSearch,
            value: props.value
          })
        )
      )
    )
  );
};

exports.default = Main;

});

require.register("components/Search.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _dom = require('react-instantsearch/dom');

var _setimmediate = require('setimmediate');

var _setimmediate2 = _interopRequireDefault(_setimmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchproduct = function searchproduct(_ref) {
  var hit = _ref.hit;


  return _react2.default.createElement(
    'div',
    { id: 'searchBox' },
    _react2.default.createElement(
      'span',
      { className: 'hit-name' },
      _react2.default.createElement(_dom.Highlight, { attributeName: 'title', hit: hit })
    )
  );
  console.log(hit);
};

var Search = function Search(props) {

  return _react2.default.createElement(
    'div',
    { className: 'container' },
    _react2.default.createElement(_dom.CurrentRefinements, null),
    _react2.default.createElement(_dom.ClearAll, null),
    _react2.default.createElement(_dom.SearchBox, null),
    _react2.default.createElement(_dom.RefinementList, { attributeName: 'category' }),
    _react2.default.createElement(_dom.Hits, { hitComponent: undefined.searchproduct }),
    _react2.default.createElement(_dom.Pagination, null)
  );
};

exports.default = Search;

});

require.register("components/SearchBox.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleChange = function handleChange(event) {
  console.log(event.target.value);
  var e = event.target.value;
  var type = 'search';
  undefined.props.handleSearch(e, type);
};

var SearchBox = function SearchBox(props) {

  return _react2.default.createElement(
    'form',
    { id: 'search-box' },
    _react2.default.createElement(
      'div',
      { className: 'twelve columns titleWord', id: 'search-options' },
      'Search by Title',
      _react2.default.createElement('input', {
        onChange: props.handleSearch,
        type: 'text',
        value: props.value
      }),
      _react2.default.createElement('img', { id: 'search-img', src: 'assets/images/search-icon.png' })
    )
  );
};

exports.default = SearchBox;

});

require.register("components/Snippets.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeCurrentKey = function changeCurrentKey(event) {
  var newIndex = event.target.name;
  console.log(newIndex);
  props.changeCurrentIndex(newIndex);
};

var Snippets = function Snippets(props) {

  return _react2.default.createElement(
    'li',
    null,
    _react2.default.createElement(
      _reactRouterDom.Link,
      {
        to: '/editor',
        onClick: changeCurrentKey,
        value: props.value,
        name: props.value,
        className: 'snippetTitles' },
      props.snippetTitle
    )
  );
};

exports.default = Snippets;

});

require.register("components/Snippetslist.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Snippets = require('./Snippets');

var _Snippets2 = _interopRequireDefault(_Snippets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleClick = function handleClick() {
  props.displaySearch();
};

var handleSortType = function handleSortType(event) {
  var sortValue = event.target.name;

  props.handleSort(sortValue);
};

var Snippetslist = function Snippetslist(props) {

  var snippetmap = props.snippets.map(function (snippetTitle, index) {
    return _react2.default.createElement(_Snippets2.default, {
      key: index,
      value: index,
      snippetTitle: props.snippets[index].title,
      currentIndex: props.currentIndex,
      changeCurrentIndex: props.changeCurrentIndex
    });
  });

  return _react2.default.createElement(
    'div',
    { id: 'snippetBox' },
    _react2.default.createElement('p', null),
    _react2.default.createElement(
      'ul',
      null,
      snippetmap
    )
  );
};

exports.default = Snippetslist;

});

require.register("components/Sortby.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sortby = function Sortby(props) {

  return _react2.default.createElement(
    'option',
    { value: props.item },
    props.item
  );
};

exports.default = Sortby;

});

require.register("components/Sortbylist.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Sortby = require('./Sortby');

var _Sortby2 = _interopRequireDefault(_Sortby);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleChange = function handleChange(event) {
  console.log(event.target.value);
  var e = event.target.value;
  console.log(e);
  var type = 'sort';
  props.handleSearch(e, type);
};

var handleSubmit = function handleSubmit(event) {
  console.log('test');
  event.preventDefault();
};

var Sortbylist = function Sortbylist(props) {

  var languageMap = props.defaultSnippetArray.map(function (snippet, index) {
    if (props.defaultSnippetArray[index].language === undefined) {
      return '';
    } else {
      return props.defaultSnippetArray[index].language;
    };
  });

  var uniqueLanguageMap = languageMap.filter(function (item, pos, self) {
    if (item === '') {
      return;
    } else {
      return self.indexOf(item) == pos;
    }
  });

  var keywordMap = props.defaultSnippetArray.map(function (snippet, index) {
    if (_typeof(props.defaultSnippetArray[index].keywords) === undefined) {
      return '';
    } else {
      return props.defaultSnippetArray[index].keywords;
    };
  });

  var filteredkeyWordMap = keywordMap.filter(function (item, pos) {
    return item !== '';
  });

  var newkeywordArray = [];
  for (var i = 0; i < filteredkeyWordMap.length; i++) {
    newkeywordArray[i] = filteredkeyWordMap[i].split(',');
  };

  var keywordArrayMerged = [].concat.apply([], newkeywordArray);

  var trimmedKeywordArray = keywordArrayMerged.map(function (item, index) {
    return item.trim();
  });

  var initialsortByArray = uniqueLanguageMap.concat(trimmedKeywordArray);

  var sortByArrayUnique = initialsortByArray.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
  });

  var sortByArray = sortByArrayUnique.sort();

  sortByArray.unshift('All Titles');

  var sortByArrayRender = sortByArray.map(function (item, index) {
    return _react2.default.createElement(_Sortby2.default, {
      key: index,
      value: item,
      item: item,
      handleChange: handleChange,
      sortValue: props.sortValue
    });
  });

  return _react2.default.createElement(
    'form',
    { onSubmit: handleSubmit },
    _react2.default.createElement(
      'label',
      { className: 'titleWord' },
      'Filter',
      _react2.default.createElement(
        'select',
        { className: 'u-full-width ', value: props.sortValue, onChange: props.handleSort },
        sortByArrayRender
      )
    )
  );
};

exports.default = Sortbylist;

});

require.register("components/layouts/Header.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logOut = function logOut() {
  props.logOut();
};

var onClickSubmit = function onClickSubmit(event) {
  props.onSubmit();
};

var Header = function Header(props) {

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
          { id: 'logoWord', className: 'userNav' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/', className: 'userNav' },
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
          _react2.default.createElement('img', { className: 'avatar', src: props.currentUser.avatar }),
          _react2.default.createElement(
            _reactRouterDom.Link,
            {
              to: '/main' },
            _react2.default.createElement(
              'li',
              { key: props.currentUser.id,
                className: 'userNav' },
              props.currentUser.firstName,
              '\'s Code Library'
            )
          )
        )
      )
    )
  );
};

exports.default = Header;

});

require.register("components/layouts/temp.js", function(exports, require, module) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var carBrands = ["Alfa Romeo", "Audi", "BMW", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep", "Kia", "Mazda", "Mercedez-Benz", "Mitsubishi", "Nissan", "Peugeot", "Porsche", "SAAB", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"];

/**
 * EXERCISE
 *
 * Create a Typeahead Input
 * ------------------------
 *
 * General guidelines: Use default browser styles. Focus on functionality.
 *
 * Requirements:
 *   1. As the user types in the input, a list of options should appear below
 *      it. The list should contain items from the `list` prop that *start* with
 *      the user entered value (case insensitive).
 *   2. Every new character typed should filter the list.
 *   3. List should only appear when input is not empty. Whitespace only is
 *      considered empty.
 *   4. Clicking on a list item should populate the input with the selected
 *      value and hide the list.
 */

var Typeahead = function (_React$Component) {
  _inherits(Typeahead, _React$Component);

  function Typeahead(props) {
    _classCallCheck(this, Typeahead);

    var _this = _possibleConstructorReturn(this, (Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call(this, props));

    _this.state = {
      value: '',
      defaultArray: props.list,
      filteredArray: []
    };

    _this.filter = _this.filter.bind(_this);
    _this.onHandleClick = _this.onHandleClick.bind(_this);

    return _this;
  }

  _createClass(Typeahead, [{
    key: "filter",
    value: function filter(event) {
      var evt = event.target.value;
      var filtered = this.state.defaultArray.filter(function (item) {
        if (item.toUpperCase().includes(evt.toUpperCase()) && item.toUpperCase().indexOf(evt.toUpperCase()) === 0) {
          return true;
        }
      });

      this.setState({ value: event.target.value });

      if (event.target.value !== '') {
        this.setState({ filteredArray: filtered });
      } else {
        this.setState({ filteredArray: [] });
      }
    }
  }, {
    key: "onHandleClick",
    value: function onHandleClick(event) {
      var newValue = event.target.innerHTML;

      this.setState({ value: event.target.innerHTML });
      this.setState({ filteredArray: [] });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var currentList = this.state.filteredArray;
      var mappedList = currentList.map(function (item) {
        return _react2.default.createElement(
          "li",
          { onClick: _this2.onHandleClick },
          item
        );
      });

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement("input", { value: this.state.value, onChange: this.filter }),
        _react2.default.createElement(
          "ul",
          null,
          mappedList
        )
      );
    }
  }]);

  return Typeahead;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Typeahead, { list: carBrands }), document.getElementById("root"));

});

require.register("index.js", function(exports, require, module) {
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
require.alias("events/events.js", "events");
require.alias("node-browser-modules/node_modules/process/browser.js", "process");
require.alias("util/util.js", "sys");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map