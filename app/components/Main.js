import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Snippetslist from './Snippetslist';
import Addsnippet from './Addsnippet';
import Sortbylist from './Sortbylist';
import SearchBox from './SearchBox';

const Main = (props) => {

    return (
      <section >
        <div className="container">
            <div className="row">
              <div className="offset-by-one seven columns">
              <h5 className="titleWord">{this.props.sortValue}</h5>
              <h1>Hello world!</h1>
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
                <Sortbylist
                  snippets={this.props.snippets}
                  sortValue={this.props.sortValue}
                  onSortChange={this.props.onSortChange}
                  handleSort={this.props.handleSort}
                  defaultSnippetArray={this.props.defaultSnippetArray}
                />
                <SearchBox
                  handleSearch={this.props.handleSearch}
                  value={this.props.value}
                />
              </div>
            </div>
        </div>
      </section>
    );
};

export default Main;
