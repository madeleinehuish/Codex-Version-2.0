import axios from 'axios';
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import expect, { createSpy, spyOn, isSpy } from 'expect';
import update from 'immutability-helper';
import { Link } from 'react-router';
import Header from './layouts/Header';
import Editor from './Editor';
import Home from './Home';
import Main from './Main';
import Addsnippet from './Addsnippet';


const App = React.createClass({

  getInitialState(){
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
    testCode: `function fibonacci(indexNumber) {
if (indexNumber === 0 || indexNumber === 1) {
return 1;
} else {
return (fibonacci(indexNumber-1) + fibonacci(indexNumber-2));
}
}

fibonacci();`,
    newTestCodeValue: ``
    }
  },


  // var index = client.initIndex('contacts');
  // var contactsJSON = require('./contacts.json');
  //
  // index.addObjects(contactsJSON, function(err, content) {
  //   if (err) {
  //     console.error(err);
  //   }
  // });

  addNewSnippetButton() {
    const newIndex = this.state.snippetTitles.length;
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

  addNewSnippetToStateAndDB() {


    // this.setState({ snippets: this.state.snippets.concat( this.state.addSnippet ) });
    axios.post('/api-snippets', this.state.addSnippet )
    .then(res => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
    this.setState({ addSnippet: this.state.defaultSnippet }, ()=> {
      this.forceUpdate();
      console.log('reset!');
    });


  },

changeCurrentIndex(newIndex) {
  console.log(newIndex);
  this.setState({ currentIndex: newIndex }, ()=> {
    console.log(this.state.currentIndex);
  });
},

changeEditor(newValue) {
  this.setState({ newTestCodeValue: newValue });
  console.log(this.state.newTestCodeValue);
},

componentDidMount() {

    axios.get('/api-token')
    .then(res => {
      // console.log(res.data);  //getting through
      this.setState({ loggedIn : true });
      // console.log(this.state.loggedIn); //working
    })
    .then(() => {
      return axios.get('/api-users')
    })
    .then(res => {
      // console.log(res.data); //getting through
      this.setState({ currentUser: res.data });
      console.log(res.data.gistUrl);
      // axios.get('/api-snippets/gists')
      //   .then((result)=>{
      //     console.log(result);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      return res;
    })
    .then((res) => {
      // console.log(res.data.id);
      let id = res.data.id;
      return axios.get(`/api-snippets/${id}`);
    })
    .then(res => {

      let snippetData = res.data.snippetsData;
      console.log(snippetData);
      // let x = JSON.stringify(snippetData);
      // console.log(x);
      this.setState({ snippets: snippetData, defaultSnippetArray: snippetData, sortedSnippets: snippetData });

      // index.addObjects(objects, function(err, content) {
      //   console.log(content);
      // });

    })
    .catch((error) => {
      console.log(error);
    });
},


  deleteSnippet() {
    const current = this.state.snippets[this.state.currentIndex];
    let id = current.id;
    console.log(id);
    // axios.delete(`/api-snippets/${id}`)
    axios.delete(`/api-snippets/${id}`)
    .then((res)=> {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },

  logOut() {
    this.setState({
      loggedIn: false,
      currentUser: {},
      previousOrders: {}
    });
  },

  onEditorChange(newValue) {
    this.setState({ snippets: update(this.state.snippets, {[this.state.currentIndex]: { codeSnippet: {$set: newValue}}})})
  },

  onEditorChangeAddSnippet(newValue) {
    this.setState({ addSnippet: update(this.state.addSnippet, { codeSnippet: {$set: newValue}}) });
    this.setState({ addSnippet: update(this.state.addSnippet, { userId: {$set: this.state.currentUser.id }}) });
  },

  onFormChange(event) {
    console.log(event.target.value)
    // console.log(this.state.title);
    console.log(this.state.snippets[this.state.currentIndex].title);
    // const snippet = this.state.snippets[this.state.currentIndex];
    // this.setState({ snippets[this.state.currentIndex].title : event.target.value });
    // this.setState( snippets[this.state.currentIndex].title : event.target.value );
    this.setState({ snippets: update(this.state.snippets, {[this.state.currentIndex]: {[event.target.name]: {$set: event.target.value}}}) });
    // return Object.assign({}, snippets, { title: event.target.value });
  },

  onFormChangeAddSnippet(event) {
    console.log(event.target.value)
    // console.log(this.state.title);
    console.log(this.state.addSnippet.title);

    this.setState({ addSnippet: update(this.state.addSnippet, {[event.target.name]: {$set: event.target.value}}) });


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

  handleSort(event) {
    let sortValue = event.target.value;
    this.setState({ sortValue: sortValue }, ()=> {
      if (this.state.sortValue === 'All Titles') {
        this.setState({ sortValue: ''});
      }
    });
    let filteredSnippets;
    let sortThis = this.state.defaultSnippetArray;
    if (sortValue !== "All Titles" || sortValue === '') {
      filteredSnippets = sortThis.filter((element) => {
        if (element.language.includes(sortValue)) {
          return element.language.includes(sortValue)
        } else if (element.keywords.includes(sortValue)) {
        return element.keywords.includes(sortValue)
        }
      });
      this.setState({ snippets: filteredSnippets },()=>{console.log(this.state.snippets)})
    } else {
      this.setState({ snippets: this.state.defaultSnippetArray }, ()=>{console.log('default snippets')});
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

  patchSnippets() {
    console.log(this.state.currentIndex);
    const current = this.state.snippets[this.state.currentIndex];
    console.log(typeof current);
    let id = current.id;
    // let id = current;
    // id = id.toString();
    console.log(id);
    // const id = this.state.currentIndex
    console.log(typeof(id));
    // const title = this.state.snippets[id].title;
    // const codeSnippet = this.state.snippets[id].codeSnippet;
    // const keywords = this.state.snippets[id].keywords;
    // const notes = this.state.snippets[id].notes;
    // console.log(this.state.snippets[id + 1]);

    axios.patch(`/api-snippets/${id}`, this.state.snippets[this.state.currentIndex])
      .then((res)=> {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  reRenderButton() {
    console.log('rerender');
    this.setState({ renderByLanguage: true });
  },

	render() {
    // console.log(this.state.snippets.snippetsData[0].title);
    return (
			<BrowserRouter>
				<main>
          <Match pattern="/" exactly render={
            () =>
            <Home
              { ...this.state }
              onSubmitGitHubLogIn={this.onSubmitGitHubLogIn}
            />
          }/>
          <Match pattern="/addsnippet" exactly render={
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
          <Match pattern="/editor" exactly render={
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
          <Match pattern="/main" exactly render={
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
              />
            </div>
          }/>
				</main>
			</BrowserRouter>
		)
	}

});

export default App;
