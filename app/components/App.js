import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import update from 'immutability-helper';
import Header from './layouts/Header';
import Editor from './Editor';
import Home from './Home';
import Main from './Main';
import Addsnippet from './Addsnippet';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
      title: '',
    };

    this.addNewSnippetButton = this.addNewSnippetButton.bind(this);
    this.addNewSnippetToStateAndDB = this.addNewSnippetToStateAndDB.bind(this);
    this.changeCurrentIndex = this.changeCurrentIndex.bind(this);
    this.changeEditor = this.changeEditor.bind(this);
    this.deleteSnippet = this.deleteSnippet.bind(this);
    this.logOut = this.logOut.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onEditorChangeAddSnippet = this.onEditorChangeAddSnippet.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormChangeAddSnippet = this.onFormChangeAddSnippet.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.sortedValues = this.sortedValues.bind(this);
    this.patchSnippets = this.patchSnippets.bind(this);
    this.reRenderButton = this.reRenderButton.bind(this);
  }

  addNewSnippetButton() {
    const newIndex = this.state.snippetTitles.length;
  }

  addNewSnippetToStateAndDB() {
    axios.post('/api-snippets', this.state.addSnippet )
    .then(res => {
      const addSnippet = res.data;
      this.setState({
        snippets: this.state.snippets.concat([addSnippet]),
        defaultSnippetArray: this.state.defaultSnippetArray.concat([addSnippet]),
        addSnippet: this.state.defaultSnippet
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  changeCurrentIndex(newIndex) {
    this.setState({ currentIndex: newIndex }, ()=> {
      console.log(this.state.currentIndex);
    });
  }

  changeEditor(newValue) {
    this.setState({ newTestCodeValue: newValue });
    console.log(this.state.newTestCodeValue);
  }

  componentDidMount() {
    axios.get('/api-token')
    .then(res => {
      this.setState({ loggedIn : true });
    })
    .then(() => {

      return axios.get('/api-users')
    })
    .then(res => {
      this.setState({ currentUser: res.data });

      return res;
    })
    .then((res) => {
      let id = res.data.id;

      return axios.get(`/api-snippets/${id}?gistUrl=${this.state.currentUser.gistUrl}&githubToken=${this.state.currentUser.githubToken}`)
    })
    .then(res => {
      let snippetData = res.data.snippetsData;

      this.setState({ snippets: snippetData, defaultSnippetArray: snippetData });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteSnippet() {
    const current = this.state.snippets[this.state.currentIndex];
    let id = current.id;

    axios.delete(`/api-snippets/${id}`)
    .then((res)=> {
      const delSnippet = res.data;

      this.setState({
        defaultSnippetArray: update(this.state.defaultSnippetArray, {$splice: [[this.state.currentIndex, 1]]}),
        snippets: update(this.state.snippets, {$splice: [[this.state.currentIndex, 1]]}),

      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  logOut() {
    this.setState({
      loggedIn: false,
      currentUser: {},
      previousOrders: {}
    });
  }

  onEditorChange(newValue) {
    this.setState({ snippets: update(this.state.snippets, {[this.state.currentIndex]: { codeSnippet: {$set: newValue}}})})
  }

  onEditorChangeAddSnippet(newValue) {
    this.setState({ addSnippet: update(this.state.addSnippet, { codeSnippet: {$set: newValue}}) });
    this.setState({ addSnippet: update(this.state.addSnippet, { userId: {$set: this.state.currentUser.id }}) });
  }

  onFormChange(event) {
    this.setState({ snippets: update(this.state.snippets, {[this.state.currentIndex]: {[event.target.name]: {$set: event.target.value}}}) });
    this.setState({ defaultSnippetArray: update(this.state.defaultSnippetArray, {[this.state.currentIndex]: {[event.target.name]: {$set: event.target.value}}}) });
  }

  onFormChangeAddSnippet(event) {
    this.setState({ addSnippet: update(this.state.addSnippet, {[event.target.name]: {$set: event.target.value}}) });
  }

  handleSearch(event) {
    let search = event.target.value;
    this.setState({ value: search }, () =>
      this.sortedValues()
    );
  }

  handleSort(event) {
    let sort = event.target.value
    this.setState({ sortValue: sort }, () =>
      this.sortedValues()
    );
  }

  sortedValues() {
    let sortValue = this.state.sortValue;
    let searchValue = this.state.value;
    let render;

    //if searchValue empty and sortValue empty
    if (searchValue === '' && sortValue === 'All Titles') {
      render = this.state.defaultSnippetArray;

      return this.setState({ snippets: render });
    } else

    //if searchValue empty and sortValue filled
    if (searchValue === '' && sortValue !== 'All Titles') {
      render = this.state.defaultSnippetArray.filter((element, index) => {
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
      render = this.state.defaultSnippetArray.filter((element, index) => {
        if(element.title.toUpperCase().includes(searchValue.toUpperCase())) {

          return true;
        }
      });
      return this.setState({ snippets: render });
    } else

    //if searchValue filled and sortValue filled
    if (searchValue !== '' && sortValue !== 'All Titles') {
      render = this.state.defaultSnippetArray.filter((element, index) => {
        if(element.title.toUpperCase().includes(searchValue.toUpperCase())){
          if (element.language.includes(sortValue)) {

            return true;
          }
          if (element.keywords.includes(sortValue)) {

            return true
          }
        }

        return false;
      });

      return this.setState({ snippets: render });
    }
  }

  patchSnippets() {
    const current = this.state.snippets[this.state.currentIndex];
    let id = current.id;

    axios.patch(`/api-snippets/${id}`, this.state.snippets[this.state.currentIndex])
      .then((res)=> {
        this.setState({ snippets: update(this.state.snippets, { [this.state.currentIndex]: { $set: current } }) });
        this.setState({ defaultSnippetArray: update(this.state.defaultSnippetArray, { [this.state.currentIndex]: { $set: current } }) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reRenderButton() {
    this.setState({ renderByLanguage: true });
  }

  render() {

    return (
  		<Router>
  			<main>
          <Route exact path="/" exactly render={
            () =>
            <Home
              { ...this.state }
              onSubmitGitHubLogIn={this.onSubmitGitHubLogIn}
            />
          }/>
          <Route exact path="/addsnippet" exactly render={
            () =>
            <div>
              <Header
                { ...this.state }
                logIn={this.logIn}
                logOut={this.logOut}
                onSubmit={this.onSubmit}
                onFormChange={this.onFormChange}
              />
              <Addsnippet
                { ...this.state }
                addNewSnippetToStateAndDB={this.addNewSnippetToStateAndDB}
                changeEditor={this.changeEditor}
                currentIndex={this.state.currentIndex}
                snippets={this.state.snippets}
                onFormChangeAddSnippet={this.onFormChangeAddSnippet}
                onEditorChangeAddSnippet={this.onEditorChangeAddSnippet}
                patchSnippets={this.patchSnippets}
              />
            </div>
          }/>
          <Route exact path="/editor" exactly render={
            () =>
            <div>
              <Header
                { ...this.state }
                logIn={this.logIn}
                logOut={this.logOut}
                onSubmit={this.onSubmit}
                onFormChange={this.onFormChange}
              />
              <Editor
                { ...this.state }
                changeEditor={this.changeEditor}
                currentIndex={this.state.currentIndex}
                snippets={this.state.snippets}
                onFormChange={this.onFormChange}
                onEditorChange={this.onEditorChange}
                patchSnippets={this.patchSnippets}
                deleteSnippet={this.deleteSnippet}
              />
            </div>
          }/>
          <Route exact path="/main" exactly render={
            () =>
            <div>
              <Header
                { ...this.state }
                logIn={this.logIn}
                logOut={this.logOut}
                onSubmit={this.onSubmit}
                onFormChange={this.onFormChange}
              />
              <Main
                { ...this.state }
                loggedIn={this.state.loggedIn}
                currentUser={this.state.currentUser}
                snippets={this.state.snippets}
                currentIndex={this.state.currentIndex}
                changeCurrentIndex={this.changeCurrentIndex}
                addNewSnippetButton={this.addNewSnippetButton}
                reRenderButton={this.reRenderButton}
                onSortChange={this.onSortChange}
                handleSort={this.handleSort}
                handleSearch={this.handleSearch}
              />
            </div>
          }/>
  			</main>
  		</Router>
  	);
  }
}

export default App;
