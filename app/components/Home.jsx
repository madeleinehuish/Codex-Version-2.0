import { Link } from 'react-router';
import React from 'react';

const Home = React.createClass({

  onClickSubmit(event) {
    this.props.onSubmitGitHubLogIn();
  },

  render() {
    return (
      <section id="home">
        <div id="hero">
          <h1 id="titleWord">Codex</h1>
          {/* <div className="twelve columns"> */}
            <a className="mainTitle" href="/api-oauth/github">Sign in with GitHub</a>
          {/* </div> */}
        </div>
      </section>
    );
  }
});

export default Home;
