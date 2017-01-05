import React from 'react';

const SearchBox = React.createClass({

  render() {
    return (
      <form id="search-box">
        <div className="twelve columns titleWord" id="search-options">Search by Title
          <input
            onChange={this.props.handleSearch}
            type='text'
            value={this.props.value}
          />
          {/* <div id="search-img"> */}
            <img src="images/search-icon.png" />
          {/* </div> */}
        </div>
      </form>
    );
  }
});

export default SearchBox;
