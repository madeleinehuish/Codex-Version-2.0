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

    const snippetmap = this.props.snippets.map((snippetTitle, index) => {
      return <Snippets
        key={index}
        value={index}
        snippetTitle={this.props.snippets[index].title}
        currentIndex={this.props.currentIndex}
        changeCurrentIndex={this.props.changeCurrentIndex}
      />
    });

    return (
      <div id="snippetBox">
        <p></p>
        <ul>
          { snippetmap }
        </ul>
      </div>
    );
  }
});

export default Snippetslist;
