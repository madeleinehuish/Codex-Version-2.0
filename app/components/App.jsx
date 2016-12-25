import axios from 'axios';
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import expect, { createSpy, spyOn, isSpy } from 'expect';

import Header from './layouts/Header';
import Editor from './Editor';
import Home from './Home';
import Main from './Main';

const App = React.createClass({

  getInitialState(){
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
                this.setState({ snippettest: this.state.snippets.snippetsData[0].title})
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

  logOut() {
    this.setState({
      loggedIn: false,
      currentUser: {},
      previousOrders: {}
    });
  },

  onFormChange(event) {
    this.setState({ [event.target.name] : event.target.value })
    if (this.state.loggedIn) {
      this.setState( { email: this.state.currentUser.email })

    };

    const incompleteForm = (this.state.firstName === '' || this.state.lastName === '' ||
      this.state.address1 === '' || this.state.city === '' || this.state.zip === '' || this.state.email === '')
        ;

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

  changeEditor(newValue) {
    this.setState({ newTestCodeValue: newValue });
    console.log(this.state.newTestCodeValue);
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
              />
            </div>
          }/>
				</main>
			</BrowserRouter>
		)
	}

});

export default App;
