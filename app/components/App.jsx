import axios from 'axios';
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import expect, { createSpy, spyOn, isSpy } from 'expect';

import Header from './layouts/Header';
import Home from './Home';
import Main from './Main';

const App = React.createClass({

  getInitialState(){
  return {
    value: '',
    inputValue: '',
    searchVisible: false,
    formComplete: false,
    searchArray: [],
    sortType: '',
    loggedIn: false,
    currentUser: {},
    userInformation: [],
    email: '',
    firstName: '',
    lastName: ''
    }
  },

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

  onSubmitGitHubLogIn() {
    axios.get('/api-oauth/github')
      .then((response) => {
        console.log(response.data);
      })
      .catch((res) => {
        if(res instanceof Error) {
          console.log(res.message);
        } else {
          console.log(res.data);
        }
      });
  },

	render() {
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
