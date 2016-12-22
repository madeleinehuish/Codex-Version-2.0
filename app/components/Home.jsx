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
          <h2 className="mainTitle">Codex</h2>
          <div className="twelve columns">
            <button className="mainTitle" onClick={this.onClickSubmit}>SIGN IN</button>
          </div>
        </div>
      </section>
    );
  }
});

export default Home;
