import { Link } from 'react-router';
import React from 'react';

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
             {/* {this.props.loggedIn ? <li key={this.props.currentUser.id}><Link to={'/user'}>{this.props.currentUser.firstName}</Link></li> */}
              {/* : <li id="login-icon"><a href="#openModal">Sign In</a></li>} */}
            <li id="products"><a href="/api-oauth/github">GitHub</a></li>
            {/* <li><Link to="/guides">Guides</Link></li>
            <li><Link to="/cart"><img src="images/cart.png" /></Link></li> */}
          </ul>
        </nav>
      </div>

    </header>
    );
  }
});

export default Header;
