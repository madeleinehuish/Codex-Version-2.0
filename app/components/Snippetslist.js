import React from 'react';
import Snippets from './Snippets';

const handleClick = () => {
  props.displaySearch();
}

const handleSortType = (event) => {
  const sortValue = event.target.name;

  props.handleSort(sortValue);
}

const Snippetslist = (props) => {

    const snippetmap = props.snippets.map((snippetTitle, index) => {
      return <Snippets
        key={index}
        value={index}
        snippetTitle={props.snippets[index].title}
        currentIndex={props.currentIndex}
        changeCurrentIndex={props.changeCurrentIndex}
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
