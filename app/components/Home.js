import { Link } from 'react-router';
import React from 'react';

const onClickSubmit = (event) => {
  this.props.onSubmitGitHubLogIn();
}

const Home = (props) => {

  return (
    <section id="home">
      <div id="hero">
        <h1 className="mainTitleWord">Codex</h1>
          <a className="mainTitle" href="/api-oauth/github">Sign in with GitHub</a>
      </div>
    </section>
  );

};

export default Home;
