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
    // console.log(this.props.snippetTitles);
    const snippetmap = this.props.snippetTitles.map((snippetTitle, index) => {
      return <Snippets
        key={index}
        value={index}
        snippetTitle={snippetTitle}
        currentIndex={this.props.currentIndex}
        changeCurrentIndex={this.props.changeCurrentIndex}
        // value={this.state.snippets[index].title}
      />
    });

    return (
      <div>
        <p></p>
        <ul>
            { snippetmap }

            {/* <Snippets
              snippets={this.props.snippets}
              snippetTitles={this.props.snippetTitles}
            /> */}
        </ul>
      </div>
    );
  }
});

export default Snippetslist;
