import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const logOut = () => {
  props.logOut();
}

const onClickSubmit = (event) => {
  props.onSubmit();
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
            <img className="avatar" src={props.currentUser.avatar} />
            <Link
              to='/main'>
              <li key={props.currentUser.id}
                  className="userNav">
                    {props.currentUser.firstName}'s Code Library
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
