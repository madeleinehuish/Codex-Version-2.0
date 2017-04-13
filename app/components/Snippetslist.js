import React from 'react';
import Snippets from './Snippets';

const handleClick = () => {
  this.props.displaySearch();
}

const handleSortType = (event) => {
  const sortValue = event.target.name;

  this.props.handleSort(sortValue);
}

const Snippetslist = (props) => {

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

export default Snippetslist;
