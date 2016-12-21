import axios from 'axios';
import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import expect, { createSpy, spyOn, isSpy } from 'expect'

const App = React.createClass({

	render() {
    return (
			<BrowserRouter>
				<main>
				  <Header
                    { ...this.state }
                    logIn={this.logIn}
                    logOut={this.logOut}
                    onSubmit={this.onSubmit}
                    onFormChange={this.onFormChange}
                    signUpFirstName={this.state.signUpFirstName}
                    signUpLastName={this.state.signUpLastName}
                    signUpEmail={this.state.signUpEmail}
                    signUpPassword={this.state.signUpPassword}
                  />
                  <Match pattern="/" exactly render={
                    () =>
                    <Home { ...this.state } />
                  }/>
				</main>
			</BrowserRouter>
		)
	}

});
