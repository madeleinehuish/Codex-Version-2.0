import axios from 'axios';
import { Link } from 'react-router';
import React from 'react';
import { render, ReactDOM } from 'react-dom';
import Snippetslist from './Snippetslist';
import Addsnippet from './Addsnippet';
import Sortbylist from './Sortbylist';
import Search from './Search';
import {InstantSearch, Hits, SearchBox, Highlight} from 'react-instantsearch/dom';
import setimmediate from 'setimmediate';


const Main = React.createClass({


  render() {

    return (
      <section >
        <div className="container">
            <div className="row">
              <div className="eight columns">
              <h4 className="titleWord">{this.props.currentUser.firstName}'s Code Library</h4>
              <h5>{this.props.sortValue}</h5>

              <Snippetslist
                snippets={this.props.snippets}
                snippetTitles={this.props.snippetTitles}
                currentIndex={this.props.currentIndex}
                changeCurrentIndex={this.props.changeCurrentIndex}
              />
              <p></p>
              </div>
              <div className="four columns">
                <Link to="/addsnippet"><button className="titleWord" id="addSnippetButton" onClick={this.props.addNewSnippetButton}>Add New Snippet</button></Link>
                <br/><br/>
                {/* <button className="titleWord" id="addSnippetButton" onClick={this.props.addNewGistButton}>Add Gists to Library</button> */}
                <br/><br/>
                <Sortbylist
                  snippets={this.props.snippets}
                  sortValue={this.props.sortValue}
                  onSortChange={this.props.onSortChange}
                  handleSort={this.props.handleSort}
                  defaultSnippetArray={this.props.defaultSnippetArray}
                />
                <br/><br/>
                <InstantSearch
                  appId="N1SG3F753R"
                  apiKey="4501729e99160b33af59fcc9fb0570bb"
                  indexName="snippets"
                >
                  <Search/>
                </InstantSearch>
              </div>
            </div>
        </div>
      </section>
    );
  }
});

export default Main;
