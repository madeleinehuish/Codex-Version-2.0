import { Link } from 'react-router';
import React from 'react';

const Home = React.createClass({
  render() {
    return (
      <section id="home">
        <div id="hero">
          <h1>Codex</h1>
          <div className="twelve columns">
            <button><Link to="/user">SIGN IN</Link></button>
          </div>
        </div>
      </section>
    );
  }
});

export default Home;
