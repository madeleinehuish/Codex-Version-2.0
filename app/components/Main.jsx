import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import Snippetslist from './Snippetslist';


const Main = React.createClass({

  render() {
    console.log(this.props.snippetTitles);

    return (
      <section >

          <div className="offset-by-one eight columns">
          <h4 id="titleWord">{this.props.currentUser.firstName}'s Code Library</h4>
          {/* { snippetsmap } */}

          {/* {this.props.snippets} */}
          <Snippetslist
            snippets={this.props.snippets}
            snippetTitles={this.props.snippetTitles}
          />
          <p></p>
          </div>
      </section>
    );
  }
});

export default Main;
