import Snippets from './Snippets';
import React from 'react';

const Snippetslist = React.createClass({
  handleClick() {
    this.props.displaySearch();
  },

  handleSortType(event) {
    const sortValue = event.target.name;

    this.props.handleSort(sortValue);
  },

  render() {
    console.log(this.props.snippetTitles);
    const snippetmap = this.props.snippetTitles.map((snippetTitle, index) => {
      return <Snippets
        key={index}
        snippetTitle={snippetTitle}
        // value={this.state.snippets[index].title}
      />
    });

    return (
      <div>
          { snippetmap }

          {/* <Snippets
            snippets={this.props.snippets}
            snippetTitles={this.props.snippetTitles}
          /> */}
      </div>
    );
  }
});

export default Snippetslist;
