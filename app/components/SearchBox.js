import React from 'react';

const SearchBox = React.createClass({

  handleChange(event) {
    console.log(event.target.value);
    let e = event.target.value;
    let type = 'search';
    this.props.handleSearch(e, type);
  },

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
            <img id="search-img" src="assets/images/search-icon.png"/>
          {/* </div> */}
        </div>
      </form>
    );
  }
});

export default SearchBox;
