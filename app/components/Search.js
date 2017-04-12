import React from 'react';
import { render } from 'react-dom';
import {InstantSearch, Hits, SearchBox, Highlight, RefinementList, Pagination, CurrentRefinements, ClearAll} from 'react-instantsearch/dom';
import setimmediate from 'setimmediate';


const Search = React.createClass({
  searchproduct({hit}) {
      return (
        <div id="searchBox">
          <span className="hit-name">
          <Highlight attributeName="title" hit={hit} />
          </span>
        </div>
      );
      console.log(hit);
  },

  render() {
    return (
      <div className="container">
        <CurrentRefinements/>
        <ClearAll/>
        <SearchBox/>
        <RefinementList attributeName="category" />
        <Hits hitComponent={this.searchproduct} />
        <Pagination />
      </div>
    )
  }
});

export default Search;
