import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Yoga Teacher Portal</h1>
        <p>An amazing tool for managing student information for private sessions.</p>
        <Link to="about" className="btn btn-primary btn-lg">Sign In</Link>
      </div>
    );
  }
}

export default HomePage;
