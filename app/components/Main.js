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
              <h5 className="titleWord">{props.sortValue}</h5>
              {/* <h1>Hello world!</h1> */}
              <Snippetslist
                snippets={props.snippets}
                snippetTitles={props.snippetTitles}
                currentIndex={props.currentIndex}
                changeCurrentIndex={props.changeCurrentIndex}
              />
              <p></p>
              </div>
              <div className="four columns">
                <Link to="/addsnippet"><button className="titleWord" id="addSnippetButton" onClick={props.addNewSnippetButton}>Add New Snippet</button></Link>
                <br/><br/>
                <Sortbylist
                  snippets={props.snippets}
                  sortValue={props.sortValue}
                  onSortChange={props.onSortChange}
                  handleSort={props.handleSort}
                  defaultSnippetArray={props.defaultSnippetArray}
                />
                <SearchBox
                  handleSearch={props.handleSearch}
                  value={props.value}
                />
              </div>
            </div>
        </div>
      </section>
    );
};

export default Main;
