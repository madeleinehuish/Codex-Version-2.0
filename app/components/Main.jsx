import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import Snippetslist from './Snippetslist';
import Addsnippet from './Addsnippet';


const Main = React.createClass({



  render() {
    // console.log(this.props.snippetTitles);

    return (
      <section >
        <div className="container">
            <div className="row">
              <div className="eight columns">
              <h4 className="titleWord">{this.props.currentUser.firstName}'s Code Library</h4>

              <Snippetslist
                snippets={this.props.snippets}
                snippetTitles={this.props.snippetTitles}
                currentIndex={this.props.currentIndex}
                changeCurrentIndex={this.props.changeCurrentIndex}
              />
              <p></p>
              </div>
              <div>
                <Link to="/addsnippet"><button className="titleWord" id="addSnippetButton" onClick={this.props.addNewSnippetButton}>Add New Snippet</button></Link>
              </div>
            </div>
        </div>
      </section>
    );
  }
});

export default Main;
