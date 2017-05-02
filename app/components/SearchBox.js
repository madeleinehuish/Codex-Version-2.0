import React from 'react';

const handleChange = (event) => {
  console.log(event.target.value);
  let e = event.target.value;
  let type = 'search';
  this.props.handleSearch(e, type);
}

const SearchBox = (props) => {

  return (
    <form id="search-box">
      <div className="twelve columns titleWord" id="search-options">Search by Title
        <input
          onChange={props.handleSearch}
          type='text'
          value={props.value}
        />
          <img id="search-img" src="assets/images/search-icon.png"/>
      </div>
    </form>
  );
}

export default SearchBox;
