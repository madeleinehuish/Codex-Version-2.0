import axios from 'axios';
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import expect, { createSpy, spyOn, isSpy } from 'expect';

import Header from './layouts/Header';
import Home from './Home';

const App = React.createClass({

  getInitialState(){
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
    }
  },

    logIn(user) {
    const email = this.state.signupEmail;
    const password = this.state.signupPassword;

    if (!email) {
      alert('Email must not be blank');
    }
    if (!password) {
      alert('Password must not be blank');
    }

    axios.post('/api-token', { email, password })
      .then((res) => {
        sessionStorage.setItem('userId', res.data.id);
        this.setState({ loggedIn : true, currentUser: res.data });
      })
      .then(() => {
        axios.get(`/api-orders/${this.state.currentUser.id}`)
          .then((res) => {
            const sortedOrders = res.data.sortedOrderItems;

            this.setState({ previousOrders: sortedOrders });
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .then(() => {
        axios.get('api-orders/')
          .then(res => {
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch(function (error) {
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

  onSubmit(event) {
    const firstName = this.state.signupFirstName;
    const lastName = this.state.signupLastName;
    const email = this.state.signupEmail;
    const password = this.state.signupPassword;

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

    axios.post('/api-users', { firstName, lastName, email, password })
      .then((response) => {
        axios.post('/api-token', { email, password })
          .then((res) => {
            sessionStorage.setItem('userId', res.data.id);
            this.setState({ loggedIn : true, currentUser: res.data });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
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
			// <div>Hello World</div>
			<BrowserRouter>
				<main>
				  <Header
            { ...this.state }
            logIn={this.logIn}
            logOut={this.logOut}
            onSubmit={this.onSubmit}
            onFormChange={this.onFormChange}
          />
          <Match pattern="/" exactly render={
            () =>
            <Home
              { ...this.state }
              onSubmitGitHubLogIn={this.onSubmitGitHubLogIn}
            />
          }/>
				</main>
			</BrowserRouter>
		)
	}

});

export default App;
