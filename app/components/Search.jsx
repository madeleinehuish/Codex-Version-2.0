import React from 'react';
import { render } from 'react-dom';
import {InstantSearch, Hits, SearchBox} from 'react-instantsearch/dom';
import setimmediate from 'setimmediate';


const Search = React.createClass({
  searchproduct({hit}) {
      return (
        <div>
          {hit.title}
        </div>
      );
      console.log(hit);
  },

  render() {
    return (
      <div className="container">
        <SearchBox/>
        <Hits hitComponent={this.searchproduct} />
      </div>
    )
  }
});

export default Search;
