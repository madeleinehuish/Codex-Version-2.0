import { Link } from 'react-router';
import React from 'react';
import axios from 'axios';

const Header = React.createClass({



  logOut(){
    this.props.logOut();
  },

  onClickSubmit(event) {
    this.props.onSubmit();
  },

  render() {
    return (
    <header>
      <div className="twelve columns">
        <div className="six columns" id="logo">
          <h5 id="logoWord">
          <Link to="/">Codex</Link>
          </h5>
        </div>
        <nav className="six columns">
          <ul>
            <li key={this.props.currentUser.id} id="userNav">{this.props.currentUser.firstName}</li>
            <li><Link to="/main">Main</Link></li>
            <li><Link to="/editor">Editor</Link></li>


          </ul>
        </nav>
      </div>

    </header>
    );
  }
});

export default Header;
