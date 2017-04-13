import { Link } from 'react-router';
import React from 'react';
import axios from 'axios';

const logOut = () => {
  this.props.logOut();
}

const onClickSubmit = (event) => {
  this.props.onSubmit();
}

const Header = (props) => {

  return (
  <header>
    <div className="twelve columns">
      <div className="six columns" id="logo">
        <h5 id="logoWord" className="userNav">
        <Link to="/" className="userNav">Codex</Link>
        </h5>
      </div>
      <nav className="six columns">
        <ul>
          <img className="avatar" src={this.props.currentUser.avatar} />
          <Link
            to='/main'>
            <li key={this.props.currentUser.id}
                className="userNav">
                  {this.props.currentUser.firstName}'s Code Library
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  </header>
  );
};

export default Header;
