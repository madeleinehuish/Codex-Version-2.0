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
require.register("components/Addsnippet.jsx", function(exports, require, module) {
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

var Addsnippet = _react2.default.createClass({
  displayName: 'Addsnippet',
  onChange: function onChange(newValue) {
    console.log('change', newValue);

    this.props.onEditorChangeAddSnippet(newValue);
  },
  render: function render() {
    if (this.props.snippets.length === 0) {
      return _react2.default.createElement('section', null);
    }
    var newIndex = 1;
    // const newIndex = this.props.currentIndex;
    var current = this.props.snippets[newIndex];
    // console.log(current.codeSnippet);
    console.log(this.props.snippets[1].codeSnippet);
    // const title = this.props.snippets[this.props.currentIndex].title;

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
                  theme: 'monokai'
                  // id="aceEditor"
                  // theme="github"
                  , onChange: this.onChange,
                  name: 'codeSnippet',
                  value: this.props.addSnippet.codeSnippet,
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
                _react2.default.createElement('input', { id: 'title', name: 'title', type: 'text', onChange: this.props.onFormChangeAddSnippet, value: this.props.addSnippet.title, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'div',
                null,
                'Language:',
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', { id: 'language', name: 'language', type: 'text', onChange: this.props.onFormChangeAddSnippet, value: this.props.addSnippet.language, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'div',
                null,
                'Keywords:',
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', { id: 'keywords', name: 'keywords', type: 'text', onChange: this.props.onFormChangeAddSnippet, value: this.props.addSnippet.keywords, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'div',
                null,
                'Notes:',
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', { id: 'notes', name: 'notes', type: 'text', onChange: this.props.onFormChangeAddSnippet, value: this.props.addSnippet.notes, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/main' },
                _react2.default.createElement(
                  'button',
                  { onClick: this.props.addNewSnippetToStateAndDB },
                  'Save Snippet'
                )
              )
            )
          )
        )
      )
    );
  }
});

exports.default = Addsnippet;
});

require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

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

var App = _react2.default.createClass({
  displayName: 'App',
  getInitialState: function getInitialState() {
    return {
      value: '',
      sortValue: '',
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
      sortedSnippets: [],
      snippetTitles: [],
      currentIndex: 0,
      // snippettest: [],
      // searchArray: [],
      // sortType: '',
      loggedIn: false,
      currentUser: {},
      title: '',
      // email: '',
      // firstName: '',
      // lastName: '',
      testCode: 'function fibonacci(indexNumber) {\nif (indexNumber === 0 || indexNumber === 1) {\nreturn 1;\n} else {\nreturn (fibonacci(indexNumber-1) + fibonacci(indexNumber-2));\n}\n}\n\nfibonacci();',
      newTestCodeValue: ''
    };
  },


  // var index = client.initIndex('contacts');
  // var contactsJSON = require('./contacts.json');
  //
  // index.addObjects(contactsJSON, function(err, content) {
  //   if (err) {
  //     console.error(err);
  //   }
  // });

  addNewSnippetButton: function addNewSnippetButton() {
    var newIndex = this.state.snippetTitles.length;
    console.log(newIndex);
    // this.setState(
    //   { snippets: update(this.state.snippets, { title : {$push: ''}})},
    //   { snippets: update(this.state.snippets, { codeSnippet : {$push: ''}})},
    //   { snippets: update(this.state.snippets, { language : {$push: ''}})},
    //   { snippets: update(this.state.snippets, { keywords : {$push: ''}})},
    //   { snippets: update(this.state.snippets, { notes : {$push: ''}})},
    //
    //   const state1 = ['x'];
    //     { snippets: = update(this.state.snippets, {$push: ['y']});
    // );
  },
  addNewSnippetToStateAndDB: function addNewSnippetToStateAndDB() {
    var _this = this;

    // this.setState({ snippets: this.state.snippets.concat( this.state.addSnippet ) });
    _axios2.default.post('/api-snippets', this.state.addSnippet).then(function (res) {
      console.log(res.data);
    }).catch(function (error) {
      console.log(error);
    });
    this.setState({ addSnippet: this.state.defaultSnippet }, function () {
      _this.forceUpdate();
      console.log('reset!');
    });
  },
  changeCurrentIndex: function changeCurrentIndex(newIndex) {
    var _this2 = this;

    console.log(newIndex);
    this.setState({ currentIndex: newIndex }, function () {
      console.log(_this2.state.currentIndex);
    });
  },
  changeEditor: function changeEditor(newValue) {
    this.setState({ newTestCodeValue: newValue });
    console.log(this.state.newTestCodeValue);
  },
  componentDidMount: function componentDidMount() {
    var _this3 = this;

    _axios2.default.get('/api-token').then(function (res) {
      // console.log(res.data);  //getting through
      _this3.setState({ loggedIn: true });
      // console.log(this.state.loggedIn); //working
    }).then(function () {
      return _axios2.default.get('/api-users');
    }).then(function (res) {
      // console.log(res.data); //getting through
      _this3.setState({ currentUser: res.data });
      console.log(res.data.gistUrl);
      // axios.get('/api-snippets/gists')
      //   .then((result)=>{
      //     console.log(result);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      return res;
    }).then(function (res) {
      // console.log(res.data.id);
      var id = res.data.id;
      return _axios2.default.get('/api-snippets/' + id);
    }).then(function (res) {

      var snippetData = res.data.snippetsData;
      console.log(snippetData);
      // let x = JSON.stringify(snippetData);
      // console.log(x);
      _this3.setState({ snippets: snippetData, defaultSnippetArray: snippetData, sortedSnippets: snippetData });

      // index.addObjects(objects, function(err, content) {
      //   console.log(content);
      // });
    }).catch(function (error) {
      console.log(error);
    });
  },
  deleteSnippet: function deleteSnippet() {
    var current = this.state.snippets[this.state.currentIndex];
    var id = current.id;
    console.log(id);
    // axios.delete(`/api-snippets/${id}`)
    _axios2.default.delete('/api-snippets/' + id).then(function (res) {
      console.log(res.data);
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
  onEditorChange: function onEditorChange(newValue) {
    this.setState({ snippets: (0, _immutabilityHelper2.default)(this.state.snippets, _defineProperty({}, this.state.currentIndex, { codeSnippet: { $set: newValue } })) });
  },
  onEditorChangeAddSnippet: function onEditorChangeAddSnippet(newValue) {
    this.setState({ addSnippet: (0, _immutabilityHelper2.default)(this.state.addSnippet, { codeSnippet: { $set: newValue } }) });
    this.setState({ addSnippet: (0, _immutabilityHelper2.default)(this.state.addSnippet, { userId: { $set: this.state.currentUser.id } }) });
  },
  onFormChange: function onFormChange(event) {
    console.log(event.target.value);
    // console.log(this.state.title);
    console.log(this.state.snippets[this.state.currentIndex].title);
    // const snippet = this.state.snippets[this.state.currentIndex];
    // this.setState({ snippets[this.state.currentIndex].title : event.target.value });
    // this.setState( snippets[this.state.currentIndex].title : event.target.value );
    this.setState({ snippets: (0, _immutabilityHelper2.default)(this.state.snippets, _defineProperty({}, this.state.currentIndex, _defineProperty({}, event.target.name, { $set: event.target.value }))) });
    // return Object.assign({}, snippets, { title: event.target.value });
  },
  onFormChangeAddSnippet: function onFormChangeAddSnippet(event) {
    console.log(event.target.value);
    // console.log(this.state.title);
    console.log(this.state.addSnippet.title);

    this.setState({ addSnippet: (0, _immutabilityHelper2.default)(this.state.addSnippet, _defineProperty({}, event.target.name, { $set: event.target.value })) });
  },


  // onSortChange(event) {
  //   this.setState({ sortValue: event.target.value }, ()=> {
  //     //try pasting code somewhere around here
  //     const snippetMap = this.state.snippets.filter((snippet, index) => {
  //         if (this.state.sortValue === '' || this.state.sortValue === 'All Titles') {
  //           return this.state.snippets[index]
  //         } else if (this.state.snippets[index].keywords.includes(this.state.sortValue) || this.state.snippets[index].language.includes(this.state.sortValue)) {
  //         return this.state.snippets[index]
  //       } else {return}
  //     });
  //     console.log(snippetMap);
  //     this.setState({ snippets: snippetMap });
  //     console.log(this.state.sortValue);
  //   })
  //
  // },

  handleSort: function handleSort(event) {
    var _this4 = this;

    var sortValue = event.target.value;
    this.setState({ sortValue: sortValue }, function () {
      if (_this4.state.sortValue === 'All Titles') {
        _this4.setState({ sortValue: '' });
      }
    });
    var filteredSnippets = void 0;
    var sortThis = this.state.defaultSnippetArray;
    if (sortValue !== "All Titles" || sortValue === '') {
      filteredSnippets = sortThis.filter(function (element) {
        if (element.language.includes(sortValue)) {
          return element.language.includes(sortValue);
        } else if (element.keywords.includes(sortValue)) {
          return element.keywords.includes(sortValue);
        }
      });
      this.setState({ snippets: filteredSnippets }, function () {
        console.log(_this4.state.snippets);
      });
    } else {
      this.setState({ snippets: this.state.defaultSnippetArray }, function () {
        console.log('default snippets');
      });
    }
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

  patchSnippets: function patchSnippets() {
    console.log(this.state.currentIndex);
    var current = this.state.snippets[this.state.currentIndex];
    console.log(typeof current === 'undefined' ? 'undefined' : _typeof(current));
    var id = current.id;
    // let id = current;
    // id = id.toString();
    console.log(id);
    // const id = this.state.currentIndex
    console.log(typeof id === 'undefined' ? 'undefined' : _typeof(id));
    // const title = this.state.snippets[id].title;
    // const codeSnippet = this.state.snippets[id].codeSnippet;
    // const keywords = this.state.snippets[id].keywords;
    // const notes = this.state.snippets[id].notes;
    // console.log(this.state.snippets[id + 1]);

    _axios2.default.patch('/api-snippets/' + id, this.state.snippets[this.state.currentIndex]).then(function (res) {
      console.log(res.data);
    }).catch(function (error) {
      console.log(error);
    });
  },
  reRenderButton: function reRenderButton() {
    console.log('rerender');
    this.setState({ renderByLanguage: true });
  },
  render: function render() {
    var _this5 = this;

    // console.log(this.state.snippets.snippetsData[0].title);
    return _react2.default.createElement(
      _reactRouter.BrowserRouter,
      null,
      _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(_reactRouter.Match, { pattern: '/', exactly: true, render: function render() {
            return _react2.default.createElement(_Home2.default, _extends({}, _this5.state, {
              onSubmitGitHubLogIn: _this5.onSubmitGitHubLogIn
            }));
          } }),
        _react2.default.createElement(_reactRouter.Match, { pattern: '/addsnippet', exactly: true, render: function render() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Header2.default, _extends({}, _this5.state, {
                logIn: _this5.logIn,
                logOut: _this5.logOut,
                onSubmit: _this5.onSubmit,
                onFormChange: _this5.onFormChange
              })),
              _react2.default.createElement(_Addsnippet2.default, _extends({}, _this5.state, {
                addNewSnippetToStateAndDB: _this5.addNewSnippetToStateAndDB,
                changeEditor: _this5.changeEditor,
                currentIndex: _this5.state.currentIndex,
                snippets: _this5.state.snippets,
                onFormChangeAddSnippet: _this5.onFormChangeAddSnippet,
                onEditorChangeAddSnippet: _this5.onEditorChangeAddSnippet,
                patchSnippets: _this5.patchSnippets
              }))
            );
          } }),
        _react2.default.createElement(_reactRouter.Match, { pattern: '/editor', exactly: true, render: function render() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Header2.default, _extends({}, _this5.state, {
                logIn: _this5.logIn,
                logOut: _this5.logOut,
                onSubmit: _this5.onSubmit,
                onFormChange: _this5.onFormChange
              })),
              _react2.default.createElement(_Editor2.default, _extends({}, _this5.state, {
                changeEditor: _this5.changeEditor,
                currentIndex: _this5.state.currentIndex,
                snippets: _this5.state.snippets,
                onFormChange: _this5.onFormChange,
                onEditorChange: _this5.onEditorChange,
                patchSnippets: _this5.patchSnippets,
                deleteSnippet: _this5.deleteSnippet
              }))
            );
          } }),
        _react2.default.createElement(_reactRouter.Match, { pattern: '/main', exactly: true, render: function render() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Header2.default, _extends({}, _this5.state, {
                logIn: _this5.logIn,
                logOut: _this5.logOut,
                onSubmit: _this5.onSubmit,
                onFormChange: _this5.onFormChange
              })),
              _react2.default.createElement(_Main2.default, _extends({}, _this5.state, {
                loggedIn: _this5.state.loggedIn,
                currentUser: _this5.state.currentUser,
                snippets: _this5.state.snippets,
                currentIndex: _this5.state.currentIndex,
                changeCurrentIndex: _this5.changeCurrentIndex,
                addNewSnippetButton: _this5.addNewSnippetButton,
                reRenderButton: _this5.reRenderButton,
                onSortChange: _this5.onSortChange,
                handleSort: _this5.handleSort
              }))
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

    this.props.onEditorChange(newValue);
    // const editor = ace.edit("codeSnippet");
    // const code = editor.getValue();
    // console.log(code);
    // this.props.onFormChange(event);
    // this.props.changeEditor(newValue);
  },


  // formUpdate () {
  //   this.props.onFormChange()
  // },

  render: function render() {
    if (this.props.snippets.length === 0) {
      return _react2.default.createElement('section', null);
    }
    var newIndex = 1;
    // const newIndex = this.props.currentIndex;
    var current = this.props.snippets[newIndex];
    // console.log(current.codeSnippet);
    //console.log(this.props.snippets[1].codeSnippet);
    // const title = this.props.snippets[this.props.currentIndex].title;

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
                this.props.snippets[this.props.currentIndex].title
              ),
              _react2.default.createElement(
                'div',
                { id: 'codeSnippet' },
                _react2.default.createElement(_reactAce2.default, {
                  mode: 'javascript',
                  theme: 'monokai'
                  // id="aceEditor"
                  // theme="github"
                  , onChange: this.onChange,
                  name: 'codeSnippet',
                  value: this.props.snippets[this.props.currentIndex].codeSnippet,
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
                _react2.default.createElement('input', { id: 'title', name: 'title', type: 'text', onChange: this.props.onFormChange, value: this.props.snippets[this.props.currentIndex].title, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'div',
                null,
                'Language:',
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', { id: 'language', name: 'language', type: 'text', onChange: this.props.onFormChange, value: this.props.snippets[this.props.currentIndex].language, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'div',
                null,
                'Keywords:',
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', { id: 'keywords', name: 'keywords', type: 'text', onChange: this.props.onFormChange, value: this.props.snippets[this.props.currentIndex].keywords, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'div',
                null,
                'Notes:',
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', { id: 'notes', name: 'notes', type: 'text', onChange: this.props.onFormChange, value: this.props.snippets[this.props.currentIndex].notes, className: 'validate' })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/main' },
                _react2.default.createElement(
                  'button',
                  { onClick: this.props.patchSnippets },
                  'Save To Database'
                )
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/main' },
                _react2.default.createElement(
                  'button',
                  { onClick: this.props.deleteSnippet },
                  'Delete This Snippet'
                )
              )
            )
          )
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
          { className: 'titleWord' },
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

var _Addsnippet = require('./Addsnippet');

var _Addsnippet2 = _interopRequireDefault(_Addsnippet);

var _Sortbylist = require('./Sortbylist');

var _Sortbylist2 = _interopRequireDefault(_Sortbylist);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _dom = require('react-instantsearch/dom');

var _setimmediate = require('setimmediate');

var _setimmediate2 = _interopRequireDefault(_setimmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _react2.default.createClass({
  displayName: 'Main',
  render: function render() {

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
            { className: 'eight columns' },
            _react2.default.createElement(
              'h4',
              { className: 'titleWord' },
              this.props.currentUser.firstName,
              '\'s Code Library'
            ),
            _react2.default.createElement(
              'h5',
              null,
              this.props.sortValue
            ),
            _react2.default.createElement(_Snippetslist2.default, {
              snippets: this.props.snippets,
              snippetTitles: this.props.snippetTitles,
              currentIndex: this.props.currentIndex,
              changeCurrentIndex: this.props.changeCurrentIndex
            }),
            _react2.default.createElement('p', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'four columns' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/addsnippet' },
              _react2.default.createElement(
                'button',
                { className: 'titleWord', id: 'addSnippetButton', onClick: this.props.addNewSnippetButton },
                'Add New Snippet'
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_Sortbylist2.default, {
              snippets: this.props.snippets,
              sortValue: this.props.sortValue,
              onSortChange: this.props.onSortChange,
              handleSort: this.props.handleSort,
              defaultSnippetArray: this.props.defaultSnippetArray
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _dom.InstantSearch,
              {
                appId: 'N1SG3F753R',
                apiKey: '4501729e99160b33af59fcc9fb0570bb',
                indexName: 'snippets'
              },
              _react2.default.createElement(_Search2.default, null)
            )
          )
        )
      )
    );
  }
});

exports.default = Main;
});

require.register("components/Search.jsx", function(exports, require, module) {
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

var Search = _react2.default.createClass({
  displayName: 'Search',
  searchproduct: function searchproduct(_ref) {
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
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(_dom.CurrentRefinements, null),
      _react2.default.createElement(_dom.ClearAll, null),
      _react2.default.createElement(_dom.SearchBox, null),
      _react2.default.createElement(_dom.RefinementList, { attributeName: 'category' }),
      _react2.default.createElement(_dom.Hits, { hitComponent: this.searchproduct }),
      _react2.default.createElement(_dom.Pagination, null)
    );
  }
});

exports.default = Search;
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
  changeCurrentKey: function changeCurrentKey(event) {
    var newIndex = event.target.name;
    console.log(newIndex);
    this.props.changeCurrentIndex(newIndex);
  },
  render: function render() {
    return (
      // <div className="four columns">
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/editor', onClick: this.changeCurrentKey, value: this.props.value, name: this.props.value, className: 'snippetTitles' },
          this.props.snippetTitle
        )
      )
      // </div>

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
    var _this = this;

    // if (renderByLanguage) {
    //   const snippetmap = this.props.snippets.map((snippetLanguage, index) => {
    //     return this.props.snippets.language
    //   })
    // }
    var snippetmap = this.props.snippets.map(function (snippetTitle, index) {
      return _react2.default.createElement(_Snippets2.default, {
        key: index,
        value: index,
        snippetTitle: _this.props.snippets[index].title,
        currentIndex: _this.props.currentIndex,
        changeCurrentIndex: _this.props.changeCurrentIndex
        // value={this.state.snippets[index].title}
      });
    });

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('p', null),
      _react2.default.createElement(
        'ul',
        null,
        snippetmap
      )
    );
  }
});

exports.default = Snippetslist;
});

require.register("components/Sortby.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sortby = _react2.default.createClass({
  displayName: 'Sortby',
  render: function render() {
    return _react2.default.createElement(
      'option',
      { value: this.props.item },
      this.props.item
    );
  }
});

exports.default = Sortby;
});

require.register("components/Sortbylist.jsx", function(exports, require, module) {
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

var Sortbylist = _react2.default.createClass({
  displayName: 'Sortbylist',
  handleChange: function handleChange(event) {
    console.log(event.target.value);
    this.props.handleSort(event);
    // this.setState({value: event.target.value});
  },
  handleSubmit: function handleSubmit(event) {
    console.log('test');
    // alert('You picked :  ' + this.state.value);
    event.preventDefault();
  },
  render: function render() {
    var _this = this;

    var languageMap = this.props.defaultSnippetArray.map(function (snippet, index) {
      if (_this.props.defaultSnippetArray[index].language === undefined) {
        return '';
      } else {
        return _this.props.defaultSnippetArray[index].language;
      };
    });

    var uniqueLanguageMap = languageMap.filter(function (item, pos, self) {
      if (item === '') {
        return;
      } else {
        return self.indexOf(item) == pos;
      }
    });

    var keywordMap = this.props.defaultSnippetArray.map(function (snippet, index) {
      if (_typeof(_this.props.defaultSnippetArray[index].keywords) === undefined) {
        return '';
      } else {
        return _this.props.defaultSnippetArray[index].keywords;
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
        handleChange: _this.handleChange,
        sortValue: _this.props.sortValue
      });
    });

    return _react2.default.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      _react2.default.createElement(
        'label',
        { className: 'titleWord' },
        'Sort By',
        _react2.default.createElement(
          'select',
          { className: 'u-full-width ', value: this.props.value, onChange: this.handleChange },
          sortByArrayRender
        )
      )
    );
  }
});

exports.default = Sortbylist;
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
            { id: 'logoWord', className: 'userNav' },
            _react2.default.createElement(
              _reactRouter.Link,
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
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/main' },
              _react2.default.createElement(
                'li',
                { key: this.props.currentUser.id, className: 'userNav' },
                this.props.currentUser.firstName
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
require.alias("events/events.js", "events");
require.alias("process/browser.js", "process");
require.alias("util/util.js", "sys");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map